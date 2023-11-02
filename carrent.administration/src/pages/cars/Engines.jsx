import React, { useEffect, useState } from "react";
import styles from "./../../components/Table/Table.module.css";

// react-bootstrap components
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import fetchData from "../../functions/fetchData";

function Engines() {
  const [newEngine, setNewEngine] = useState({ id: 0, name: "" });
  const [engines, setEngines] = useState([]);
  const [filteredEngines, setFilteredEngines] = useState([]);
  const [serachTerm, setSerachTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchData("https://localhost:7091/EngineType/all")
      .then((data) => {
        console.log(data);
        setEngines(data);
        setFilteredEngines(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Lodaing</p>;
  }

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(serachTerm);
    setFilteredEngines(engines.filter((e) => e.name.includes(serachTerm)));
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSerachTerm(value);
  };

  const handleEngineChange = (event) => {
    const { value } = event.target;
    setNewEngine({ ...newEngine, name: value });
  };

  const onDoubleClick = (engine) => {
    console.log(engine);
    setNewEngine(engine);
    setIsEditMode(true);
  };

  const onCancel = () => {
    setNewEngine({ id: 0, name: "" });
    setIsEditMode(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (isEditMode) {
      editEngine(newEngine.id);
    } else {
      addNewEngine();
    }
  };

  const editEngine = (id) => {
    fetchData(`https://localhost:7091/EngineType/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: newEngine,
    })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => {
        setNewEngine({ id: 0, name: "" });
      });
  };

  const addNewEngine = () => {
    fetchData("https://localhost:7091/EngineType/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: newEngine,
    })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => {
        setNewEngine({ id: 0, name: "" });
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
                  <Col>
                    <Button onClick={onCancel}>Dodaj</Button>
                  </Col>
                  <Col xs={2}>
                    <p>Silniki</p>
                  </Col>
                  <Col>
                    <Form className="d-flex" onSubmit={handleSearch}>
                      <Form.Control
                        name="serachTerm"
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        onChange={handleChange}
                      />
                      <Button variant="outline-success" type="submit">
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
                    {filteredEngines.map((engine) => (
                      <tr
                        key={engine.id}
                        onDoubleClick={() => onDoubleClick(engine)}
                      >
                        <td>{engine.id}</td>
                        <td>{engine.name}</td>
                        <td></td>
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
                  Typy silników - {isEditMode ? "edycja" : "dodawanie"}
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
                      value={newEngine.name}
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
