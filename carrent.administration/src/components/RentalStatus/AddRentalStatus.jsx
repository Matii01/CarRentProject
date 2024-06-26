import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import jwtInterceptor from "../../utils/jwtInterceptor";

function AddRentalStatus({ onAdd }) {
  const [newStatus, setNewStatus] = useState({
    status: "",
    remarks: "",
    isDefault: false,
  });

  const onSubmit = (event) => {
    event.preventDefault();
    AddNewStatus();
  };

  const AddNewStatus = () => {
    console.log(newStatus);
    jwtInterceptor
      .post(`RentalStatus/create`, JSON.stringify(newStatus), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        toast.success("Zapisano zmiany");
        setNewStatus({ status: "", remarks: "", isDefault: false });
        onAdd(data.data);
      })
      .catch((error) => console.log(error));
  };

  const handleCancel = () => {
    setNewStatus({ status: "", remarks: "", isDefault: false });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setNewStatus((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (event) => {
    setNewStatus((prev) => ({ ...prev, isDefault: event.target.checked }));
    console.log(event.target.checked);
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
          <Form.Group className="" controlId="formBasicCheckbox">
            <input
              type="checkbox"
              checked={newStatus.isDefault}
              onChange={handleCheckboxChange}
            />
            <label className="p-2">Domyślne</label>
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
