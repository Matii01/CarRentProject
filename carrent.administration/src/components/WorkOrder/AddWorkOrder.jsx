import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";

function AddWorkOrder({ onAdd, forFilters }) {
  const [newWorkOrder, setNewWorkOrder] = useState(initialState);

  const onSubmit = (event) => {
    event.preventDefault();
    AddNewWorkOrder();
  };

  const AddNewWorkOrder = () => {
    setNewWorkOrder({ ...initialState });
    jwtInterceptor
      .post(`WorkOrder/newWorkOrder`, JSON.stringify(newWorkOrder), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        setNewWorkOrder({ ...initialState });
        //onAdd(data.data);
        onAdd();
      })
      .catch((error) => console.log(error));
  };

  const handleCancel = () => {
    setNewWorkOrder({ ...initialState });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setNewWorkOrder((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Card className="p-2">
        <Card.Header>
          <Card.Title as="h5">Zlecenie - dodawanie</Card.Title>
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
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Tytuł</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="Title"
                  value={newWorkOrder.Title}
                />
              </Form.Group>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    onChange={handleChange}
                    name="WorkOrderStatusId"
                    value={newWorkOrder.WorkOrderStatusId}
                  >
                    <option value={null}>Select... </option>
                    {forFilters &&
                      forFilters.priorities.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Priorytet</Form.Label>
                  <Form.Select
                    onChange={handleChange}
                    name="WorkOrderPriorityId"
                    value={newWorkOrder.WorkOrderPriorityId}
                  >
                    <option value={null}>Select... </option>
                    {forFilters &&
                      forFilters.statuses.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Pracownik</Form.Label>
                  <Form.Select
                    onChange={handleChange}
                    name="WorkerId"
                    value={newWorkOrder.WorkerId}
                  >
                    <option value={null}>Select... </option>
                    {forFilters &&
                      forFilters.worker.map((type) => (
                        <option key={type.workerId} value={type.workerId}>
                          {type.name}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Planowane ukończenie</Form.Label>
                  <Form.Control
                    name="ScheduledDate"
                    type="date"
                    onChange={handleChange}
                    value={newWorkOrder.ScheduledDate}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Szacowany czas</Form.Label>
                  <Form.Control
                    name="EstimatedHours"
                    type="number"
                    onChange={handleChange}
                    value={newWorkOrder.EstimatedHours}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Opis</Form.Label>
                  <Form.Control
                    as={"textarea"}
                    name="Description"
                    type="text"
                    style={{ height: 100 }}
                    onChange={handleChange}
                    value={newWorkOrder.Description}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Notatki</Form.Label>
                  <Form.Control
                    as={"textarea"}
                    name="Notes"
                    type="text"
                    style={{ height: 100 }}
                    onChange={handleChange}
                    value={newWorkOrder.Notes}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default AddWorkOrder;

const initialState = {
  Title: "",
  WorkerId: "",
  Description: "",
  ScheduledDate: "",
  WorkOrderStatusId: "",
  WorkOrderPriorityId: "",
  EstimatedHours: "",
  Notes: "",
};
