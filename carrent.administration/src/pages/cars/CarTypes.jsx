import React, { useEffect, useReducer, useState } from "react";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import styles from "./../../components/Table/Table.module.css";

const initialState = {
  newCarType: { id: 0, name: "" },
  carTypes: [],
  filteredCarTypes: [],
  serachTerm: "",
  loading: true,
  error: false,
  isEditMode: false,
};

function carTypeReducer(state, action) {
  switch (action.type) {
    case "SET_TYPES":
      return {
        ...state,
        carTypes: action.payload,
        filteredCarTypes: action.payload,
      };
    case "FILTER_TYPES":
      return {
        ...state,
        filteredCarTypes: action.payload,
      };
    case "SET_NEW_TYPE":
      return {
        ...state,
        newCarType: action.payload,
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

function CarTypes() {
  const [state, dispatch] = useReducer(carTypeReducer, initialState);
  const [searchTerm, setSerachTerm] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("https://localhost:7091/CarType")
      .then((data) => {
        console.log(data);
        dispatch({
          type: "SET_TYPES",
          payload: data.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "SET_ERROR",
          payload: error,
        });
      })
      .finally(() => {
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
      });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const filtered = state.carTypes.filter((e) => e.name.includes(searchTerm));
    dispatch({ type: "FILTER_TYPES", payload: filtered });
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSerachTerm(value);
    dispatch({ type: "UPDATE_SEARCH_TERM", payload: value });
  };

  const handleCarTypeChange = (event) => {
    const { value } = event.target;
    dispatch({
      type: "SET_NEW_TYPE",
      payload: { ...state.newCarType, name: value },
    });
  };

  const onDoubleClick = (type) => {
    console.log(type);
    dispatch({
      type: "SET_NEW_TYPE",
      payload: type,
    });
    dispatch({
      type: "TOGGLE_EDIT_MODE",
      payload: true,
    });
  };

  const onCancel = () => {
    dispatch({
      type: "SET_NEW_TYPE",
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
      editCarType(state.newCarType.id);
    } else {
      addNewCarType();
    }
  };

  const editCarType = (id) => {
    axios
      .put(
        `https://localhost:7091/cartype/update/${id}`,
        JSON.stringify(state.newCarType),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        getData();
        onCancel();
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => {
        dispatch({
          type: "SET_NEW_TYPE",
          payload: { id: 0, name: "" },
        });
      });
  };

  const addNewCarType = () => {
    axios
      .post(
        "https://localhost:7091/cartype",
        JSON.stringify(state.newCarType),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        getData();
        onCancel();
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => {
        dispatch({
          type: "SET_NEW_TYPE",
          payload: { id: 0, name: "" },
        });
      });
  };

  const handleDelete = (id) => {
    console.log("delete");
    axios
      .delete(`https://localhost:7091/cartype/${id}`)
      .then(() => {
        getData();
        onCancel();
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  if (state.loading) {
    return <p>Lodaing</p>;
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="6">
            <Card className="" style={{ marginTop: "0px" }}>
              <Card.Header>
                <Row>
                  <Col className="text-center mb-2">Typy</Col>
                </Row>
                <Row>
                  <Col>
                    <Button onClick={onCancel} size="sm">
                      Dodaj
                    </Button>
                  </Col>
                  <Col>
                    <Form className="d-flex" onSubmit={handleSearch}>
                      <Form.Control
                        size="sm"
                        name="serachTerm"
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        onChange={handleChange}
                      />
                      <Button variant="outline-success" type="submit" size="sm">
                        Search
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <table className={`${styles.table}`}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Type</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.filteredCarTypes.map((type) => (
                      <tr
                        key={type.id}
                        onDoubleClick={() => onDoubleClick(type)}
                      >
                        <td>{type.id}</td>
                        <td>{type.name}</td>
                        <td>
                          <i
                            className="fa-solid fa-trash"
                            onClick={() => handleDelete(type.id)}
                            style={{ cursor: "pointer" }}
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Card className="p-2">
              <Card.Header>
                <Card.Title as="h5">
                  Typy nadwozia - {state.isEditMode ? "edycja" : "dodawanie"}
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
                      value={state.newCarType.name}
                      onChange={handleCarTypeChange}
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

export default CarTypes;