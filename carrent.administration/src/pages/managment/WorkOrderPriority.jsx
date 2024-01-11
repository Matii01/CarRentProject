import React, { useEffect, useState } from "react";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";
import CarInfoTable from "../../components/Table/CarInfoTable";
import AddWorkOrderPriority from "../../components/WorkOrder/AddWorkOrderPriority";
import EditWorkOrderPriority from "../../components/WorkOrder/EditWorkOrderPriority";

function WorkOrderPriority() {
  const [priorities, setPriorities] = useState([]);
  const [searchTerm, setSerachTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    getPriorities();
  }, []);

  const getPriorities = () => {
    jwtInterceptor
      .get("https://localhost:7091/WorkOrderPriority")
      .then((data) => {
        console.log(data);
        setPriorities(data.data);
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
    const filtered = priorities.filter((e) =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredList(filtered);
  };

  const onDoubleClick = (priority) => {
    setIsEditMode(true);
    setSelectedPriority(priority);
  };

  const refreshView = () => {
    getPriorities();
    setIsEditMode(false);
  };

  const onDeleteClick = (itemId) => {
    console.log(itemId);

    jwtInterceptor
      .delete(`WorkOrderPriority/${itemId}`)
      .then((data) => {
        const filtered = priorities.filter((e) => e.id != itemId);
        setPriorities(filtered);
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
                  <Col className="text-center mb-2">Priorytety zleceń</Col>
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
                  thead={["Id", "Nazwa", "Opis", "Actions"]}
                  items={priorities}
                  item={["id", "name", "description"]}
                  searchTerm={searchTerm}
                  onDoubleClick={onDoubleClick}
                  handleDelete={onDeleteClick}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            {isEditMode && selectedPriority && (
              <EditWorkOrderPriority
                editPriority={selectedPriority}
                onCancel={onCancel}
                updateView={refreshView}
              />
            )}
            {!isEditMode && <AddWorkOrderPriority onAdd={refreshView} />}
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </>
  );
}

export default WorkOrderPriority;
