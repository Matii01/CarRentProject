import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";

function EditCarEquipment({ equipment, onCancel, updateView }) {
  const [editedEquipment, setEditedEquipment] = useState(equipment);

  useEffect(() => {
    setEditedEquipment(equipment);
  }, [equipment]);

  const onSubmit = (event) => {
    event.preventDefault();
    updateCarEquipment(editedEquipment);
  };

  const updateCarEquipment = () => {
    jwtInterceptor
      .put(
        `CarEquipment/update/${editedEquipment.id}`,
        JSON.stringify(editedEquipment),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        updateView(editedEquipment);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setEditedEquipment((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="p-2">
      <Card.Header>
        <Card.Title as="h5">Wyposażenie - edycja</Card.Title>
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
              value={editedEquipment.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Opis</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={editedEquipment.description}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default EditCarEquipment;
