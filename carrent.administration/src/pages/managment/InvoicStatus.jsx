import React, { useEffect, useState } from "react";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";
import CarInfoTable from "../../components/Table/CarInfoTable";
import AddInvoiceStatus from "../../components/InvoiceStatus/AddInvoiceStatus";
import EditInvoiceStatus from "../../components/InvoiceStatus/EditInvoiceStatus";
import { ToastContainer, toast } from "react-toastify";
import MyTableWithPagination from "../../components/Table/MyTableWithPagination";

function InvoiceStatus() {
  const [statuses, setStatuses] = useState([]);
  const [searchTerm, setSerachTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    getStatuses();
  }, []);

  const getStatuses = () => {
    jwtInterceptor
      .get("InvoiceStatus")
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
    jwtInterceptor
      .delete(`InvoiceStatus/${itemId}`)
      .then((data) => {
        toast.success("Usunięto");
        refreshView();
      })
      .catch((error) => {
        toast.error("Błąd");
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
                  <Col className="text-center mb-2">Statusy wypożyczeń</Col>
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
              <EditInvoiceStatus
                editStatus={selectedStatus}
                onCancel={onCancel}
                updateView={refreshView}
              />
            )}
            {!isEditMode && <AddInvoiceStatus onAdd={refreshView} />}
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </>
  );
}

export default InvoiceStatus;

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
