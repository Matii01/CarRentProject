import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";

function AddConditioning({ onAdd }) {
  const [newItem, setNewItem] = useState({ name: "" });
  const onSubmit = (event) => {
    event.preventDefault();
    AddNewItem();
  };

  const AddNewItem = () => {
    console.log(newItem);
    jwtInterceptor
      .post(`AirConditioning`, JSON.stringify(newItem), {
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
    setNewItem({ name: "" });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Card className="p-2">
        <Card.Header>
          <Card.Title as="h5">Klimatyzacje - dodawanie</Card.Title>
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
              <Form.Label>Nazwa</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newItem.name}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default AddConditioning;
