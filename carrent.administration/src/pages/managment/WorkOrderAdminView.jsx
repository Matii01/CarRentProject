import React, { useEffect, useState } from "react";
import { Button, Card, Container, Row, Col, Form } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";
import WorkOrderFiltrs from "../../components/WorkOrder/WorkOrderFiltrs";
import transformObjectToQueryString from "../../utils/transformObjectToQuery";
import TableWithPagination from "../../components/Table/TableWithPagination";
import AddWorkOrder from "../../components/WorkOrder/AddWorkOrder";
import EditWorkOrder from "../../components/WorkOrder/EditOrder";
import { formatDate } from "../../utils/formDate";

function WorkOrderAdminView() {
  const [metaData, setMetaData] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [forFilters, setForFilters] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [filtrs, setFiltrs] = useState({
    PageNumber: 1,
    PageSize: 10,
    WorkerId: "",
    WorkOrderPriority: "",
    WorkOrderStatus: "",
    CreatedDataStart: "",
    CreatedDataEnd: "",
    ScheduledDateStart: "",
    ScheduledDateEnd: "",
    CompletedDateStart: "",
    CompletedDateEnd: "",
    EstimatedHoursMin: "",
    EstimatedHoursMax: "",
    ActualHoursMin: "",
    ActualHoursMax: "",
  });

  useEffect(() => {
    getForFilters();
    getData();
  }, []);

  const getForFilters = () => {
    jwtInterceptor
      .get("WorkOrder/forFilters")
      .then((data) => {
        console.log(data.data);
        setForFilters(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const transformDataAndSetItems = (items) => {
    const transformed = items.map((it) => {
      return {
        ...it,
        createdData: formatDate(it.createdData),
      };
    });
    setItems(transformed);
  };

  const getData = () => {
    const queryString = transformObjectToQueryString(filtrs);
    jwtInterceptor
      .get(`WorkOrder/all?${queryString}`)
      .then((data) => {
        transformDataAndSetItems(data.data.items);
        setMetaData(data.data.metaData);
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

  const refreshView = () => {
    getData();
    setIsEditMode(false);
  };

  const onDeleteClick = (itemId) => {
    console.log(itemId);
    jwtInterceptor
      .delete(`WorkOrder/${itemId}`)
      .then((data) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const onApplayFiltrs = () => {
    console.log(filtrs);
    getData();
  };

  const handlePageChange = (num) => {
    setFiltrs((prev) => ({
      ...prev,
      PageNumber: num,
    }));
  };

  const handlePageSizeChange = (event) => {
    const { value } = event.target;
    setFiltrs((prev) => ({
      ...prev,
      PageSize: value,
    }));
  };

  const handleRowDoubleClick = (id) => {
    setSelectedItemId(id);
    setIsEditMode(true);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="6">
            <Row>
              <Row>
                <WorkOrderFiltrs
                  filtrs={filtrs}
                  setFiltrs={setFiltrs}
                  forFilters={forFilters}
                  onApplayFiltrs={onApplayFiltrs}
                  isAdmin={true}
                />
              </Row>
              <Row>
                <Card className="" style={{ marginTop: "0px" }}>
                  <Card.Header>
                    <Row>
                      <Col className="text-center mb-2">Zlecenia</Col>
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
                            value={""}
                            onChange={handleChange}
                          />
                        </Form>
                      </Col>
                    </Row>
                  </Card.Header>
                  <Card.Body>
                    {items && (
                      <TableWithPagination
                        thead={["ID", "Tytuł", "Data dodania"]}
                        items={items}
                        searchTerm={""}
                        item={["id", "title", "createdData", "addedDate"]}
                        metaData={metaData}
                        onDoubleClick={handleRowDoubleClick}
                        handlePageChange={handlePageChange}
                        handlePageSizeChange={handlePageSizeChange}
                      />
                    )}
                  </Card.Body>
                </Card>
              </Row>
            </Row>
          </Col>
          <Col md="6">
            {isEditMode && selectedItemId && (
              <EditWorkOrder
                forFilters={forFilters}
                workOrderId={selectedItemId}
                onCancel={onCancel}
                updateView={refreshView}
              />
            )}

            {!isEditMode && (
              <AddWorkOrder forFilters={forFilters} onAdd={refreshView} />
            )}
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </>
  );
}

export default WorkOrderAdminView;
