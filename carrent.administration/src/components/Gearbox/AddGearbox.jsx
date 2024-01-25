import { useState } from "react";
import jwtInterceptor from "../../utils/jwtInterceptor";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

function AddGearbox({ onAdd }) {
  const [newGearbox, setNewGerabox] = useState({ name: "" });
  const onSubmit = (event) => {
    event.preventDefault();
    AddNewCarMake();
  };

  const AddNewCarMake = () => {
    console.log(newGearbox);
    jwtInterceptor
      .post(`/GearboxType/create`, JSON.stringify(newGearbox), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        onAdd(data.data.createdGearbox);
        setNewGerabox({ name: "" });
      })
      .catch((error) => console.log(error));
  };

  const handleCancel = () => {
    setNewGerabox({ name: "", description: "" });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setNewGerabox((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="p-2">
      <Card.Header>
        <Card.Title as="h5">Skrzynia biegów - dodawanie</Card.Title>
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
              value={newGearbox.name}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddGearbox;
