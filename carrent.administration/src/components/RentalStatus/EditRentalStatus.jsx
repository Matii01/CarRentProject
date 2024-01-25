import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import jwtInterceptor from "../../utils/jwtInterceptor";
function EditRentalStatus({ editStatus, onCancel, updateView }) {
  const [editedStatus, setEditedStatus] = useState(editStatus);

  useEffect(() => {
    setEditedStatus(editStatus);
  }, [editStatus]);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(editedStatus);
    updateStatus();
  };

  const updateStatus = () => {
    jwtInterceptor
      .put(
        `RentalStatus/update/${editedStatus.id}`,
        JSON.stringify(editedStatus),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log(data);
        toast.success("Zapisano zmiany");
        updateView();
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setEditedStatus((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (event) => {
    setEditedStatus((prev) => ({ ...prev, isDefault: event.target.checked }));
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
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              name="status"
              value={editedStatus.status}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="" controlId="formBasicCheckbox">
            <input
              type="checkbox"
              name="isDefault"
              checked={editedStatus.isDefault}
              onChange={handleCheckboxChange}
            />
            <label className="p-2">Domyślne</label>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Uwagi</Form.Label>
            <Form.Control
              type="text"
              name="remarks"
              value={editedStatus.remarks ? editedStatus.remarks : ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}
export default EditRentalStatus;
