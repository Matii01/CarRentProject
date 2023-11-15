import { Button, Card, Col, Form, Row } from "react-bootstrap";

function EditCarMake({ editMake, onCancel }) {
  const onSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = () => {};

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
              value={editMake.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Opis</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={editMake.description ? editMake.description : ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default EditCarMake;
