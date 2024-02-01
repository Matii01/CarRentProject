import { useState } from "react";
import jwtInterceptor from "../../utils/jwtInterceptor";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

function AddCarEquipment({ onAdd }) {
  const [newEquipment, setNewEquipment] = useState({
    name: "",
    description: "",
  });

  const onSubmit = (event) => {
    event.preventDefault();
    AddNewCarEquipment();
  };

  const AddNewCarEquipment = () => {
    console.log(newEquipment);
    jwtInterceptor
      .post(`/CarEquipment/create`, JSON.stringify(newEquipment), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log(data.data);
        onAdd(data.data);
        setNewEquipment({ name: "", description: "" });
      })
      .catch((error) => console.log(error));
  };

  const handleCancel = () => {
    setNewEquipment({ name: "", description: "" });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setNewEquipment((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="p-2">
      <Card.Header>
        <Card.Title as="h5">Wyposażenie - dodawanie</Card.Title>
      </Card.Header>
      <Card.Body className="table-full-width table-responsive px-0">
        <Form onSubmit={onSubmit}>
          <Row>
            <Col>
              <Button type="submit" className="m-2" variant="primary" size="sm">
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
            <Form.Label>Nazwa</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              value={newEquipment.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Opis</Form.Label>
            <Form.Control
              required
              type="text"
              name="description"
              value={newEquipment.description}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddCarEquipment;
