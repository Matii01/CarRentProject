import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";

function EditConditioning({ editItem, onCancel, updateView }) {
  const [editedItem, setEditedItem] = useState(editItem);

  useEffect(() => {
    setEditedItem(editItem);
  }, [editItem]);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(editedItem);
    updateItem(editedItem);
  };

  const updateItem = () => {
    jwtInterceptor
      .put(
        `AirConditioning/update/${editedItem.id}`,
        JSON.stringify(editedItem),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log(data);
        updateView(editedItem);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setEditedItem((prev) => ({ ...prev, [name]: value }));
  };

  if (editedItem == null) {
    return <p>Loading</p>;
  }

  return (
    <>
      <Card className="p-2">
        <Card.Header>
          <Card.Title as="h5">Klimatyzacje - edycja</Card.Title>
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
                value={editedItem.name}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default EditConditioning;
