import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";
import { formatDate } from "../../utils/formDate";
import MyTable from "../Table/MyTable";

function EditWorkOrder({ forFilters, workOrderId, onCancel, updateView }) {
  const [workOrder, setWorkOrder] = useState();

  useEffect(() => {
    getWorkOrder();
  }, [workOrderId]);

  const getWorkOrder = () => {
    jwtInterceptor
      .get(`WorkOrder/${workOrderId}`)
      .then((data) => {
        console.log(data);
        setWorkOrder((prev) => ({
          ...data.data,
          scheduledDate: formatDate(data.data.scheduledDate),
          completedDate: formatDate(data.data.completedDate),
          createdData: formatDate(data.data.createdData),
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(workOrder);
    update();
  };

  const update = () => {
    jwtInterceptor
      .put(
        `https://localhost:7091/WorkOrder/update/${workOrderId}`,
        JSON.stringify(workOrder),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log(data);
        updateView();
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setWorkOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {};

  const onRemoveWorker = (Id) => {
    console.log(Id);
  };

  return (
    <Card className="p-2">
      <Card.Header>
        <Card.Title as="h5">Piorytet zlecenia - edycja</Card.Title>
      </Card.Header>
      <Card.Body className="table-full-width table-responsive px-0">
        {workOrder && (
          <>
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
                    value={workOrder.title}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      onChange={handleChange}
                      name="workOrderStatusId"
                      value={workOrder.workOrderStatusId}
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
                      name="workOrderPriorityId"
                      value={workOrder.workOrderPriorityId}
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
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Planowane ukończenie</Form.Label>
                    <Form.Control
                      name="scheduledDate"
                      type="date"
                      onChange={handleChange}
                      value={workOrder.scheduledDate}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Data utworzenia</Form.Label>
                    <Form.Control
                      disabled
                      name="createdData"
                      type="date"
                      onChange={handleChange}
                      value={workOrder.createdData}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Data Ukończenia</Form.Label>
                    <Form.Control
                      name="completedDate"
                      type="date"
                      onChange={handleChange}
                      value={workOrder.completedDate}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Szacowany czas</Form.Label>
                    <Form.Control
                      name="estimatedHours"
                      type="number"
                      onChange={handleChange}
                      value={workOrder.estimatedHours}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Rzeczywisty czas</Form.Label>
                    <Form.Control
                      name="actualHours"
                      type="number"
                      onChange={handleChange}
                      value={workOrder.actualHours}
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
                      name="description"
                      type="text"
                      style={{ height: 100 }}
                      onChange={handleChange}
                      value={workOrder.description}
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
                      name="notes"
                      type="text"
                      style={{ height: 100 }}
                      onChange={handleChange}
                      value={workOrder.notes}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            <Row>
              <Col>
                <MyTable
                  thead={["ID", "Name", " "]}
                  items={workOrder.workers}
                  item={["workerId", "name"]}
                  handleDelete={onRemoveWorker}
                />
              </Col>
            </Row>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default EditWorkOrder;
