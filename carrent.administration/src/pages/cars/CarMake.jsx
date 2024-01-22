import React, { useEffect, useReducer, useState } from "react";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import styles from "./../../components/Table/Table.module.css";
import EditCarMake from "../../components/CarMakes/EditCarMakes";
import AddCarMake from "../../components/CarMakes/AddCarMakes";
import CarInfoTable from "../../components/Table/CarInfoTable";
import jwtInterceptor from "../../utils/jwtInterceptor";
import MyTableWithPagination from "../../components/Table/MyTableWithPagination";

function CarMakes() {
  const [makes, setMake] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSerachTerm] = useState("");
  const [selectedMake, setSelectedMake] = useState();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    jwtInterceptor
      .get("https://localhost:7091/CarMake")
      .then((data) => {
        console.log(data);
        setMake(data.data);
        setFilteredList(data.data);
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
    setSerachTerm(value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const filtered = makes.filter((e) =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredList(filtered);
  };

  const addElement = (carMake) => {
    const newMakes = [...makes, { ...carMake }];
    setMake(newMakes);
    setFilteredList(newMakes);
  };

  const handleDelete = (id) => {
    deleteCarMake(id);
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

  const filterList = (id) => {
    console.log("id === " + id);
    const filteredMap = makes.filter((x) => x.id !== id);
    setMake(filteredMap);
    setFilteredList(filteredMap);
  };

  const deleteCarMake = (id) => {
    jwtInterceptor
      .delete(`https://localhost:7091/carmake/${id}`)
      .then((response) => {
        console.log(response);
        if (response.status === 204) {
          filterList(id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
                        value={searchTerm}
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
                  thead={["ID", "Model", "Opis", ""]}
                  items={filteredList}
                  item={["id", "name", "description"]}
                  handleDelete={handleDelete}
                  onDoubleClick={onDoubleClick}
                />
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
        <Row>
          {/* <CarInfoTable
            thead={["Id", "Model", "Opis", "Actions"]}
            items={makes}
            item={["id", "name", "description"]}
            searchTerm={searchTerm}
            onDoubleClick={onDoubleClick}
          /> */}
        </Row>
      </Container>
    </>
  );
}

export default CarMakes;

/*
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
                    {filteredList.map((type) => (
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
