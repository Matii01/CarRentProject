import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";
import { toast } from "react-toastify";

function EditWorkOrderPriority({ editPriority, onCancel, updateView }) {
  const [editedPriority, setEditedStatus] = useState(editPriority);

  useEffect(() => {
    setEditedStatus(editPriority);
  }, [editPriority]);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(editedPriority);
    updateStatus();
  };

  const updateStatus = () => {
    jwtInterceptor
      .put(
        `WorkOrderPriority/update/${editedPriority.id}`,
        JSON.stringify(editedPriority),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        toast.success("Zapisano zmiany");
        console.log(data);
        updateView(editedPriority);
      })
      .catch((error) => {
        toast.error("Edycja błąd");
        console.log(error);
      });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setEditedStatus((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="p-2">
      <Card.Header>
        <Card.Title as="h5">Piorytet zlecenia - edycja</Card.Title>
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
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editedPriority.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Uwagi</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={
                editedPriority.description ? editedPriority.description : ""
              }
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default EditWorkOrderPriority;
