import React, { useEffect, useState } from "react";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";
import CarInfoTable from "../../components/Table/CarInfoTable";
import AddWorkOrderStatus from "../../components/WorkOrder/AddWorkOrderStatus";
import EditWorkOrderStatus from "../../components/WorkOrder/EditWorkOrderStatus";
import { ToastContainer, toast } from "react-toastify";
import MyTableWithPagination from "../../components/Table/MyTableWithPagination";

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
      .get("WorkOrderStatus")
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

  const refreshView = (item) => {
    const newItems = statuses.map((it) => {
      if (it.id == item.id) {
        return item;
      } else {
        return it;
      }
    });
    setStatuses(newItems);
    setIsEditMode(false);
  };

  const onAddItem = (item) => {
    const newItems = [item, ...statuses];
    setStatuses(newItems);
    onDoubleClick(item);
  };

  const onDeleteItem = (itemId) => {
    if (selectedStatus.id === itemId) {
      setIsEditMode(false);
    }
    const newItems = statuses.filter((it) => it.id != itemId);
    setStatuses(newItems);
  };

  const onDeleteClick = (itemId) => {
    console.log(itemId);
    jwtInterceptor
      .delete(`WorkOrderStatus/${itemId}`)
      .then((data) => {
        toast.success("Usunięto");
        onDeleteItem(itemId);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Usuwanie  błąd");
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
                  <Col className="text-center mb-2">Statusy zleceń</Col>
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
                  thead={["Id", "Status", "Opis", "Actions"]}
                  items={statuses}
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
            {isEditMode && selectedStatus && (
              <EditWorkOrderStatus
                editStatus={selectedStatus}
                onCancel={onCancel}
                updateView={refreshView}
              />
            )}
            {!isEditMode && <AddWorkOrderStatus onAdd={onAddItem} />}
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </>
  );
}

export default WorkOrderStatus;

/*
<CarInfoTable
                  thead={["Id", "Status", "Opis", "Actions"]}
                  items={statuses}
                  item={["id", "name", "description"]}
                  searchTerm={searchTerm}
                  onDoubleClick={onDoubleClick}
                  handleDelete={onDeleteClick}
                />
*/
