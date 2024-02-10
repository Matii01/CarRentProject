import React, { useEffect, useReducer, useState } from "react";
import styles from "./../../components/Table/Table.module.css";

// react-bootstrap components
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";
import MyTableWithPagination from "../../components/Table/MyTableWithPagination";
import { ToastContainer, toast } from "react-toastify";

const initialState = {
  newEngine: { id: 0, name: "" },
  engines: [],
  filteredEngines: [],
  serachTerm: "",
  loading: true,
  error: false,
  isEditMode: false,
};

function enginesReducer(state, action) {
  switch (action.type) {
    case "SET_ENGINES":
      return {
        ...state,
        engines: action.payload,
        filteredEngines: action.payload,
      };
    case "FILTER_ENGINES":
      return {
        ...state,
        filteredEngines: action.payload,
      };
    case "SET_NEW_ENGINE":
      return {
        ...state,
        newEngine: action.payload,
      };
    case "UPDATE_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "TOGGLE_EDIT_MODE":
      return {
        ...state,
        isEditMode: action.payload,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function Engines() {
  const [state, dispatch] = useReducer(enginesReducer, initialState);
  const [serachTerm, setSerachTerm] = useState("");
  const [selected, setSelected] = useState();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (selected) {
      onDoubleClick(selected);
    }
  }, [selected]);

  const getData = () => {
    jwtInterceptor
      .get("EngineType/all")
      .then((data) => {
        dispatch({
          type: "SET_ENGINES",
          payload: data.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "SET_ERROR",
          payload: error,
        });
      })
      .finally(() =>
        dispatch({
          type: "SET_LOADING",
          payload: false,
        })
      );
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const filtered = state.engines.filter((e) => e.name.includes(serachTerm));
    dispatch({ type: "FILTER_ENGINES", payload: filtered });
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSerachTerm(value);
    dispatch({ type: "UPDATE_SEARCH_TERM", payload: value });
  };

  const handleEngineChange = (event) => {
    const { value } = event.target;
    dispatch({
      type: "SET_NEW_ENGINE",
      payload: { ...state.newEngine, name: value },
    });
  };

  const onDoubleClick = (engine) => {
    console.log("onDouble click");
    console.log(engine);
    dispatch({
      type: "SET_NEW_ENGINE",
      payload: engine,
    });
    dispatch({
      type: "TOGGLE_EDIT_MODE",
      payload: true,
    });
  };

  const onCancel = () => {
    dispatch({
      type: "SET_NEW_ENGINE",
      payload: { id: 0, name: "" },
    });
    dispatch({
      type: "TOGGLE_EDIT_MODE",
      payload: false,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (state.isEditMode) {
      editEngine(state.newEngine.id);
    } else {
      addNewEngine();
    }
  };

  const updateView = (item) => {
    const newItems = state.engines.map((it) => {
      if (it.id == item.id) {
        return item;
      } else {
        return it;
      }
    });
    dispatch({
      type: "SET_ENGINES",
      payload: newItems,
    });
  };

  const editEngine = (id) => {
    jwtInterceptor
      .put(`EngineType/update/${id}`, JSON.stringify(state.newEngine), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        if (data.status === 201) {
          updateView(state.newEngine);
          onCancel();
          toast.success("Zapisano zmiany");
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => {
        dispatch({
          type: "SET_NEW_ENGINE",
          payload: { id: 0, name: "" },
        });
      });
  };

  const addNewEngine = () => {
    jwtInterceptor
      .post("EngineType/create", JSON.stringify(state.newEngine), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        if (data.status === 201) {
          const newEngines = [data.data, ...state.filteredEngines];
          dispatch({
            type: "SET_ENGINES",
            payload: newEngines,
          });
          setSelected(data.data);

          toast.success("Pomyślnie dodano");
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        toast.error("Błąd");
      })
      .finally(() => {
        dispatch({
          type: "SET_NEW_ENGINE",
          payload: { id: 0, name: "" },
        });
      });
  };

  const handleDelete = (id) => {
    jwtInterceptor
      .delete(`EngineType/${id}`)
      .then(() => {
        getData();
        onCancel();
        toast.success("Pomyślnie usunięto");
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        toast.error("Błąd");
      });
  };

  if (state.loading) {
    return <p>Lodaing</p>;
  }

  return (
    <>
      <ToastContainer />
      <Container fluid>
        <Row>
          <Col md="6">
            <Card className="" style={{ marginTop: "0px" }}>
              <Card.Header>
                <Row>
                  <Col>
                    <Button size="sm" onClick={onCancel}>
                      Dodaj
                    </Button>
                  </Col>
                  <Col xs={2}>
                    <p>Silniki</p>
                  </Col>
                  <Col>
                    <Form className="d-flex" onSubmit={handleSearch}>
                      <Form.Control
                        size="sm"
                        name="serachTerm"
                        type="search"
                        placeholder="Szukaj"
                        className="me-2"
                        aria-label="Search"
                        onChange={handleChange}
                      />
                      <Button size="sm" variant="outline-success" type="submit">
                        Szukaj
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <MyTableWithPagination
                  thead={["ID", "Typ", ""]}
                  items={state.filteredEngines}
                  item={["id", "name"]}
                  onDoubleClick={onDoubleClick}
                  handleDelete={handleDelete}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Card className="p-2">
              <Card.Header>
                <Card.Title as="h5">
                  Typy silników - {state.isEditMode ? "edycja" : "dodawanie"}
                </Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Form onSubmit={onSubmit}>
                  <Row>
                    <Col>
                      <Button
                        type="submit"
                        className="m-2"
                        variant="primary"
                        size="sm"
                      >
                        Zapisz
                      </Button>
                      <Button
                        className="m-2"
                        variant="secondary"
                        size="sm"
                        onClick={onCancel}
                      >
                        Anuluj
                      </Button>
                    </Col>
                  </Row>
                </Form>
                <Form className="m-2">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Nazwa</Form.Label>
                    <Form.Control
                      type="text"
                      value={state.newEngine.name}
                      onChange={handleEngineChange}
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Engines;
