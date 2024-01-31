import React, { useEffect, useState } from "react";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";
import CarInfoTable from "../../components/Table/CarInfoTable";
import AddWorkOrderPriority from "../../components/WorkOrder/AddWorkOrderPriority";
import EditWorkOrderPriority from "../../components/WorkOrder/EditWorkOrderPriority";
import { ToastContainer, toast } from "react-toastify";
import MyTableWithPagination from "../../components/Table/MyTableWithPagination";

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
      .get("WorkOrderPriority")
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

  const refreshView = (item) => {
    const newItems = priorities.map((it) => {
      if (it.id == item.id) {
        return item;
      } else {
        return it;
      }
    });
    setPriorities(newItems);
    setIsEditMode(false);
  };

  const onAddItem = (item) => {
    const newItems = [item, ...priorities];
    setPriorities(newItems);
    onDoubleClick(item);
  };

  const onDeleteItem = (itemId) => {
    if (selectedPriority.id === itemId) {
      setIsEditMode(false);
    }
    const newItems = priorities.filter((it) => it.id != itemId);
    setPriorities(newItems);
  };

  const onDeleteClick = (itemId) => {
    jwtInterceptor
      .delete(`WorkOrderPriority/${itemId}`)
      .then((data) => {
        onDeleteItem(itemId);
        toast.success("usunięto");
      })
      .catch((error) => {
        console.log(error);
        toast.success("usuwanie - błąd");
      });
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <ToastContainer />
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
                    <Form className="d-flex" onSubmit={handleSearchSubmit}>
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
                    </Form>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <MyTableWithPagination
                  thead={["Id", "Nazwa", "Opis", "Actions"]}
                  items={priorities}
                  item={["id", "name", "description"]}
                  searchTerm={searchTerm}
                  serachBy={"name"}
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
            {!isEditMode && <AddWorkOrderPriority onAdd={onAddItem} />}
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </>
  );
}

export default WorkOrderPriority;

/**
 <CarInfoTable
    thead={["Id", "Nazwa", "Opis", "Actions"]}
    items={priorities}
    item={["id", "name", "description"]}
    searchTerm={searchTerm}
    onDoubleClick={onDoubleClick}
    handleDelete={onDeleteClick}
  />
 */
