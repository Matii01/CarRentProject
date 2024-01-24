import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";
import { toast } from "react-toastify";

function AddCarMake({ onAdd }) {
  const [newCarMake, setNewCarMake] = useState({ name: "", description: "" });
  const onSubmit = (event) => {
    event.preventDefault();
    AddNewCarMake();
  };

  const AddNewCarMake = () => {
    console.log(newCarMake);
    jwtInterceptor
      .post(`carmake/create`, JSON.stringify(newCarMake), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        setNewCarMake({ name: "", description: "" });
        toast.success("dodano");
        onAdd(data.data);
      })
      .catch((error) => console.log(error));
  };

  const handleCancel = () => {
    setNewCarMake({ name: "", description: "" });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setNewCarMake((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="p-2">
      <Card.Header>
        <Card.Title as="h5">Model - dodawanie</Card.Title>
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
              type="text"
              name="name"
              value={newCarMake.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Opis</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={newCarMake.description}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}
export default AddCarMake;
