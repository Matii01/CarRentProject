import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";

function EditGearboxType({ gearbox, onCancel, updateView }) {
  const [editedGearbox, setEditedGearbox] = useState(gearbox);

  useEffect(() => {
    setEditedGearbox(gearbox);
  }, [gearbox]);

  const onSubmit = (event) => {
    event.preventDefault();
    updateGearbox(editedGearbox);
  };

  const updateGearbox = () => {
    console.log("todo: update");
    jwtInterceptor
      .put(
        `GearboxType/update/${editedGearbox.id}`,
        JSON.stringify(editedGearbox),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log(data);
        updateView(editedGearbox);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setEditedGearbox((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h5">Gearbox - edycja</Card.Title>
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
                onClick={onCancel}
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
              value={editedGearbox.name}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default EditGearboxType;
