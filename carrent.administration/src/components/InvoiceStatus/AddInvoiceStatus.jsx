import axios from "axios";
import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";

function AddInvoiceStatus({ onAdd }) {
  //public string Name { get; set; } = null!;
  //public string Description { get; set; } = null!;

  const [newStatus, setNewStatus] = useState({
    name: "",
    description: "",
  });

  const onSubmit = (event) => {
    event.preventDefault();
    AddNewStatus();
  };

  const AddNewStatus = () => {
    console.log(newStatus);
    jwtInterceptor
      .post(
        `https://localhost:7091/InvoiceStatus/create`,
        JSON.stringify(newStatus),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log(data.data);
        setNewStatus({ name: "", description: "" });
        onAdd();
      })
      .catch((error) => console.log(error));
  };

  const handleCancel = () => {
    setNewStatus({ name: "", description: "" });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setNewStatus((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="p-2">
      <Card.Header>
        <Card.Title as="h5">Statusy faktur - dodawanie</Card.Title>
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
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={newStatus.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Opis</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={newStatus.description}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddInvoiceStatus;
