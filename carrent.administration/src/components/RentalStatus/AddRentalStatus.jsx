import axios from "axios";
import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

function AddRentalStatus({ onAdd }) {
  const [newStatus, setNewStatus] = useState({ status: "", remarks: "" });

  const onSubmit = (event) => {
    event.preventDefault();
    AddNewStatus();
  };

  const AddNewStatus = () => {
    console.log(newStatus);
    axios
      .post(
        `https://localhost:7091/RentalStatus/create`,
        JSON.stringify(newStatus),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log(data.data);
        setNewStatus({ status: "", remarks: "" });
        onAdd();
      })
      .catch((error) => console.log(error));
  };

  const handleCancel = () => {
    setNewStatus({ status: "", remarks: "" });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setNewStatus((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="p-2">
      <Card.Header>
        <Card.Title as="h5">Status wypożyczenia - dodawanie</Card.Title>
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
              name="status"
              value={newStatus.status}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Uwagi</Form.Label>
            <Form.Control
              type="text"
              name="remarks"
              value={newStatus.remarks}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddRentalStatus;
