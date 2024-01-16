import React, { useEffect, useState } from "react";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";
import CarInfoTable from "../../components/Table/CarInfoTable";
import AddWorkOrderStatus from "../../components/WorkOrder/AddWorkOrderStatus";
import EditWorkOrderStatus from "../../components/WorkOrder/EditWorkOrderStatus";

function WorkOrderStatus() {
  const [statuses, setStatuses] = useState([]);
  const [searchTerm, setSerachTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    getStatuses();
  }, []);

  const getStatuses = () => {
    jwtInterceptor
      .get("https://localhost:7091/WorkOrderStatus")
      .then((data) => {
        console.log(data);
        setStatuses(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onCancel = () => {
    setIsEditMode(false);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSerachTerm(value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const filtered = statuses.filter((e) =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredList(filtered);
  };

  const onDoubleClick = (status) => {
    setIsEditMode(true);
    setSelectedStatus(status);
  };

  const refreshView = () => {
    getStatuses();
    setIsEditMode(false);
  };

  const onDeleteClick = (itemId) => {
    console.log(itemId);
    jwtInterceptor
      .delete(`WorkOrderStatus/${itemId}`)
      .then((data) => {
        const filtered = statuses.filter((e) => e.id != itemId);
        setStatuses(filtered);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="6">
            <Card className="" style={{ marginTop: "0px" }}>
              <Card.Header>
                <Row>
                  <Col className="text-center mb-2">Statusy zleceń</Col>
                </Row>
                <Row>
                  <Col>
                    <Button onClick={onCancel} size="sm">
                      Dodaj
                    </Button>
                  </Col>
                  <Col>
                    <Form className="d-flex" onSubmit={handleSearch}>
                      <Form.Control
                        size="sm"
                        name="serachTerm"
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        value={searchTerm}
                        onChange={handleChange}
                      />
                      <Button variant="outline-success" type="submit" size="sm">
                        Search
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <CarInfoTable
                  thead={["Id", "Status", "Opis", "Actions"]}
                  items={statuses}
                  item={["id", "name", "description"]}
                  searchTerm={searchTerm}
                  onDoubleClick={onDoubleClick}
                  handleDelete={onDeleteClick}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            {isEditMode && selectedStatus && (
              <EditWorkOrderStatus
                editStatus={selectedStatus}
                onCancel={onCancel}
                updateView={refreshView}
              />
            )}
            {!isEditMode && <AddWorkOrderStatus onAdd={refreshView} />}
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </>
  );
}

export default WorkOrderStatus;