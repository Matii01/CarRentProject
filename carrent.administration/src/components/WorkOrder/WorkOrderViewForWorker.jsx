import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";
import { formatDate } from "../../utils/formDate";
import MyTable from "../Table/MyTable";
import { toast } from "react-toastify";

function WorkOrderViewForWorker({
  forFilters,
  workOrderId,
  onCancel,
  updateView,
}) {
  const [isEditable, setIsEditable] = useState(false);
  const [workOrder, setWorkOrder] = useState({});
  const [newWorker, setNewWorker] = useState({
    WorkOrderId: workOrderId,
    WorkerId: "",
  });

  useEffect(() => {
    getWorkOrder();
  }, [workOrderId]);

  useEffect(() => {
    setIsEditable(workOrder.isEditable);
  }, [workOrder]);

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
      .put(`WorkOrder/update/${workOrderId}`, JSON.stringify(updatedObject()), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log(data);
        toast.success("Zapisano zmiany");
        updateView();
      })
      .catch((error) => console.log(error));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(workOrder);
    update();
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setWorkOrder((prev) => ({ ...prev, [name]: value }));
  };

  const doNotChangeValueChange = () => {};

  const handleCancel = () => {};

  const handleNewWorkerChange = (event) => {
    const { value, name } = event.target;
    setNewWorker((prev) => ({ ...prev, [name]: value }));
  };

  const asCompleated = () => {
    jwtInterceptor
      .post(
        `WorkOrder/compleat/${workOrderId}`,
        JSON.stringify(updatedObject()),
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
                    disabled={!isEditable}
                    type="submit"
                    className="m-2"
                    variant="dark"
                    size="sm"
                  >
                    Zapisz
                  </Button>
                </Col>
                <Col>
                  {isEditable == true && (
                    <Button
                      className="m-2"
                      variant="dark"
                      size="sm"
                      onClick={asCompleated}
                    >
                      Oznacz jako ukończone
                    </Button>
                  )}
                </Col>
              </Row>
              <Row>
                <Form.Group className="mb-3">
                  <Form.Label>Tytuł</Form.Label>
                  <Form.Control
                    onChange={doNotChangeValueChange}
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
                      onChange={doNotChangeValueChange}
                      name="workOrderStatusId"
                      value={workOrder.workOrderStatusId}
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
                    <Form.Label>Priorytet</Form.Label>
                    <Form.Select
                      onChange={doNotChangeValueChange}
                      name="workOrderPriorityId"
                      value={workOrder.workOrderPriorityId}
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
                      disabled
                      name="completedDate"
                      type="date"
                      onChange={doNotChangeValueChange}
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
                      onChange={doNotChangeValueChange}
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
                {workOrder.workers && workOrder.workers.length > 0 && (
                  <MyTable
                    thead={["", "Name"]}
                    items={workOrder.workers}
                    item={["", "name"]}
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

export default WorkOrderViewForWorker;
