import React, { useEffect, useReducer, useState } from "react";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import styles from "./../../components/Table/Table.module.css";
import EditCarMake from "../../components/CarMakes/EditCarMakes";
import AddCarMake from "../../components/CarMakes/AddCarMakes";
import CarInfoTable from "../../components/Table/CarInfoTable";

function CarMakes() {
  const [makes, setMake] = useState([]);
  const [selectedMake, setSelectedMake] = useState();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    axios
      .get("https://localhost:7091/CarMake")
      .then((data) => {
        console.log(data);
        setMake(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onDoubleClick = (meke) => {
    setSelectedMake(meke);
    setIsEditMode(true);
  };

  const onCancel = () => {
    setIsEditMode(false);
  };

  const handleChange = (event) => {
    const { value } = event.target;
  };
  const handleDelete = (id) => {
    console.log("delete");
  };

  const handleSearch = (event) => {
    event.preventDefault();
  };

  const addElement = (carMake) => {
    const newMakes = [...makes, { ...carMake }];
    setMake(newMakes);
  };

  const updateView = (carMake) => {
    const editedMakes = makes.map((x) => {
      if (x.id === carMake.id) {
        x.name = carMake.name;
        x.description = carMake.description;
      }
      return x;
    });

    setMake(editedMakes);
    setIsEditMode(false);
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="6">
            <Card className="" style={{ marginTop: "0px" }}>
              <Card.Header>
                <Row>
                  <Col className="text-center mb-2">Marki</Col>
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
                      <th>Model</th>
                      <th>Opis</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {makes.map((type) => (
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
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            {isEditMode && selectedMake && (
              <EditCarMake
                editMake={selectedMake}
                onCancel={onCancel}
                updateView={updateView}
              />
            )}
            {!isEditMode && <AddCarMake onAdd={addElement} />}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CarMakes;

/*
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
*/
