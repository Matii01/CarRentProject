import axios from "axios";
import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

function AddKilometreLimit({ onAdd }) {
  const [newItem, setNewItem] = useState({ limitValue: "" });
  const onSubmit = (event) => {
    event.preventDefault();
    AddNewItem();
  };

  const AddNewItem = () => {
    console.log(newItem);
    axios
      .post(`https://localhost:7091/KilometrLimit`, JSON.stringify(newItem), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        onAdd(data.data);
      })
      .catch((error) => console.log(error));
  };

  const handleCancel = () => {
    setNewItem({ limitValue: "" });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Card className="p-2">
        <Card.Header>
          <Card.Title as="h5">Limity kilometrów - dodawanie</Card.Title>
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
                  onClick={handleCancel}
                >
                  Anuluj
                </Button>
              </Col>
            </Row>
          </Form>
          <Form className="m-2">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Wartość</Form.Label>
              <Form.Control
                type="number"
                name="limitValue"
                value={newItem.limitValue}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default AddKilometreLimit;
