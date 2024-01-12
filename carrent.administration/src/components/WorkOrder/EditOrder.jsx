import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";
import { formatDate } from "../../utils/formDate";
import MyTable from "../Table/MyTable";

function EditWorkOrder({ forFilters, workOrderId, onCancel, updateView }) {
  const [workOrder, setWorkOrder] = useState(initialWorkOrderState);
  const [newWorker, setNewWorker] = useState({
    WorkOrderId: workOrderId,
    WorkerId: "",
  });

  useEffect(() => {
    getWorkOrder();
  }, [workOrderId]);

  const getWorkOrder = () => {
    jwtInterceptor
      .get(`WorkOrder/${workOrderId}`)
      .then((data) => {
        console.log(data);
        setWorkOrder((prev) => ({
          ...prev,
          ...data.data,
          scheduledDate: formatDate(data.data.scheduledDate) ?? "",
          completedDate: formatDate(data.data.completedDate) ?? "",
          createdData: formatDate(data.data.createdData) ?? "",
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

  const updatedObject = () => {
    const { workers, ...copiedObject } = workOrder;

    copiedObject.completedDate =
      copiedObject.completedDate === "" ? null : copiedObject.completedDate;
    copiedObject.createdData =
      copiedObject.createdData === "" ? null : copiedObject.createdData;
    copiedObject.scheduledDate =
      copiedObject.scheduledDate === "" ? null : copiedObject.scheduledDate;

    return copiedObject;
  };

  const update = () => {
    jwtInterceptor
      .put(
        `https://localhost:7091/WorkOrder/update/${workOrderId}`,
        JSON.stringify(updatedObject()),
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

  const handleNewWorkerChange = (event) => {
    const { value, name } = event.target;
    setNewWorker((prev) => ({ ...prev, [name]: value }));
  };

  const assignNewWorker = (event) => {
    event.preventDefault();
    console.log(newWorker);
    jwtInterceptor
      .post(`WorkOrder/assignWorkOrder`, JSON.stringify(newWorker), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
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
                    name="title"
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
            <Form onSubmit={assignNewWorker}>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Pracownicy</Form.Label>
                    <Form.Select
                      onChange={handleNewWorkerChange}
                      name="WorkerId"
                      value={newWorker.WorkerId}
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
                <Col className="mt-4">
                  <Button className="" variant="dark" type="submit">
                    Przypisz kolejnego
                  </Button>
                </Col>
              </Row>
            </Form>

            <Row>
              <Col>
                {workOrder.workers && workOrder.workers.length > 0 && (
                  <MyTable
                    thead={["ID", "Name", " "]}
                    items={workOrder.workers}
                    item={["workerId", "name"]}
                    handleDelete={onRemoveWorker}
                  />
                )}
                {!(workOrder.workers && workOrder.workers.length > 0) && (
                  <p>Nie przypisano pracowników do zadania</p>
                )}
              </Col>
            </Row>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default EditWorkOrder;

const initialWorkOrderState = {
  actualHours: 0,
  completedDate: "",
  createdData: "",
  description: "",
  estimatedHours: 0,
  id: 0,
  notes: "",
  scheduledDate: "",
  title: "",
  workOrderPriorityId: 0,
  workOrderStatusId: 0,
  workers: [],
};
