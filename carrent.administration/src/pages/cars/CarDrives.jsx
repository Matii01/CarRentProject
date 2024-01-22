import React, { useEffect, useReducer, useState } from "react";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import styles from "./../../components/Table/Table.module.css";
import jwtInterceptor from "../../utils/jwtInterceptor";
import { ToastContainer, toast } from "react-toastify";
import MyTableWithPagination from "../../components/Table/MyTableWithPagination";

const initialState = {
  newCarDrive: { id: 0, name: "", description: "" },
  carDrives: [],
  filteredCarDrive: [],
  serachTerm: "",
  loading: true,
  error: false,
  isEditMode: false,
};

function carDriveReducer(state, action) {
  switch (action.type) {
    case "SET_DRIVE":
      return {
        ...state,
        carDrives: action.payload,
        filteredCarDrive: action.payload,
      };
    case "FILTER_DRIVES":
      return {
        ...state,
        filteredCarDrive: action.payload,
      };
    case "SET_NEW_DRIVE":
      return {
        ...state,
        newCarDrive: action.payload,
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

function CarDrives() {
  const [state, dispatch] = useReducer(carDriveReducer, initialState);
  const [searchTerm, setSerachTerm] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    jwtInterceptor
      .get("https://localhost:7091/CarDrive")
      .then((data) => {
        console.log(data);
        dispatch({
          type: "SET_DRIVE",
          payload: data.data,
        });
      })
      .catch((error) => {
        toast.error("błąd wczytywania");
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
    const filtered = state.carDrives.filter((e) => e.name.includes(searchTerm));
    dispatch({ type: "FILTER_DRIVES", payload: filtered });
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSerachTerm(value);
    dispatch({ type: "UPDATE_SEARCH_TERM", payload: value });
  };

  const handleDriveChange = (event) => {
    const { name, value } = event.target;
    dispatch({
      type: "SET_NEW_DRIVE",
      payload: { ...state.newCarDrive, [name]: value },
    });
  };

  const onDoubleClick = (drive) => {
    console.log(drive);
    dispatch({
      type: "SET_NEW_DRIVE",
      payload: drive,
    });
    dispatch({
      type: "TOGGLE_EDIT_MODE",
      payload: true,
    });
  };

  const onCancel = () => {
    dispatch({
      type: "SET_NEW_DRIVE",
      payload: { id: 0, name: "", description: "" },
    });
    dispatch({
      type: "TOGGLE_EDIT_MODE",
      payload: false,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (state.isEditMode) {
      editCarDrive(state.newCarDrive.id);
    } else {
      addNewCarDrive();
    }
  };

  const editCarDrive = (id) => {
    jwtInterceptor
      .put(
        `https://localhost:7091/CarDrive/update/${id}`,
        JSON.stringify(state.newCarDrive),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        getData();
        onCancel();
        toast.success("Zapisano zmiany");
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        toast.error("Błąd");
      })
      .finally(() => {
        dispatch({
          type: "SET_NEW_DRIVE",
          payload: { id: 0, name: "", description: "" },
        });
      });
  };

  const addNewCarDrive = () => {
    jwtInterceptor
      .post(
        "https://localhost:7091/CarDrive/create",
        JSON.stringify(state.newCarDrive),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        getData();
        onCancel();
        toast.success("Dodano");
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        toast.error("Błąd");
      })
      .finally(() => {
        dispatch({
          type: "SET_NEW_DRIVE",
          payload: { id: 0, name: "", description: "" },
        });
      });
  };

  const handleDelete = (id) => {
    console.log("delete");
    jwtInterceptor
      .delete(`https://localhost:7091/cardrive/${id}`)
      .then(() => {
        getData();
        onCancel();
        toast.success("Usunięto");
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
                  <Col className="text-center mb-2">Rodzaje napędu</Col>
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
                <MyTableWithPagination
                  thead={["Id", "Typ", "Opis", ""]}
                  items={state.filteredCarDrive}
                  item={["id", "name", "description"]}
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
                  Rodzaje napędu - {state.isEditMode ? "edycja" : "dodawanie"}
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
                      name="name"
                      value={state.newCarDrive.name}
                      onChange={handleDriveChange}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput2"
                  >
                    <Form.Label>Opis</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      value={state.newCarDrive.description}
                      onChange={handleDriveChange}
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

export default CarDrives;

/* 
 <table className={`${styles.table}`}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Type</th>
                      <th>Opis</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.filteredCarDrive.map((type) => (
                      <tr
                        key={type.id}
                        onDoubleClick={() => onDoubleClick(type)}
                      >
                        <td>{type.id}</td>
                        <td>{type.name}</td>
                        <td>{type.description}</td>
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
*/
