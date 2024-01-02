import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";

function EditCarMake({ editMake, onCancel, updateView }) {
  const [editedMake, setEditedMake] = useState(editMake);

  useEffect(() => {
    setEditedMake(editMake);
  }, [editMake]);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(editedMake);
    updateCarMake(editedMake);
  };

  const updateCarMake = () => {
    jwtInterceptor
      .put(
        `https://localhost:7091/carmake/update/${editedMake.id}`,
        JSON.stringify(editedMake),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log(data);
        updateView(editedMake);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setEditedMake((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="p-2">
      <Card.Header>
        <Card.Title as="h5">Model - edycja</Card.Title>
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
              value={editedMake.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Opis</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={editedMake.description ? editedMake.description : ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default EditCarMake;
