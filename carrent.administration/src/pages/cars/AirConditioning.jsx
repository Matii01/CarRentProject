import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button, Form } from "react-bootstrap";
import EditConditioning from "../../components/AirConditioning/EditConditioning";
import AddConditioning from "../../components/AirConditioning/AddConditioning";
import jwtInterceptor from "../../utils/jwtInterceptor";
import MyTableWithPagination from "../../components/Table/MyTableWithPagination";
import { ToastContainer, toast } from "react-toastify";

function AirConditioning() {
  const [items, setItems] = useState();
  const [searchTerm, setSerachTerm] = useState("");
  const [isEditMode, setIEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    jwtInterceptor.get("AirConditioning").then((results) => {
      console.log(results);
      setItems(results.data);
    });
  };

  const onDoubleClick = (item) => {
    setSelectedItem(item);
    setIEditMode(true);
  };

  const handleDelete = (id) => {
    if (selectedItem.id == id) {
      onCancel();
      setSelectedItem(null);
    }
    jwtInterceptor.delete(`AirConditioning/${id}`).then((results) => {
      getData();
      toast.success("usunięto");
    });
  };

  const handleSearch = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSerachTerm(value);
  };

  const onCancel = () => {
    setIEditMode(false);
  };

  const onAddNewElement = (item) => {
    const newItems = [item, ...items];
    setItems(newItems);
    onDoubleClick(item);
    toast.success("Zapisano zmiany");
  };

  const updateView = (item) => {
    const newItems = items.map((it) => {
      if (it.id == item.id) {
        return item;
      } else {
        return it;
      }
    });
    setItems(newItems);
    toast.success("Zapisano zmiany");
  };

  if (items == null) {
    return <p>Loading ... </p>;
  }
  return (
    <>
      <ToastContainer />
      <Container fluid>
        <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Row>
                  <Col className="text-center">
                    <p>Klimatyzacje</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button onClick={onCancel} variant="dark" size="sm">
                      Dodaj
                    </Button>
                  </Col>
                  <Col>
                    <Form className="d-flex" onSubmit={handleSearch}>
                      <Form.Control
                        size="sm"
                        name="serachTerm"
                        type="search"
                        placeholder="Szukaj"
                        className="me-2"
                        aria-label="Search"
                        value={searchTerm}
                        onChange={handleChange}
                      />
                      <Button variant="outline-success" type="submit" size="sm">
                        Szukaj
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <MyTableWithPagination
                  items={items}
                  thead={["Id", "Rodzaj", ""]}
                  item={["id", "name"]}
                  searchTerm={searchTerm}
                  serachBy={"name"}
                  onDoubleClick={onDoubleClick}
                  handleDelete={handleDelete}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            {isEditMode && (
              <EditConditioning
                editItem={selectedItem}
                onCancel={onCancel}
                updateView={updateView}
              />
            )}
            {!isEditMode && <AddConditioning onAdd={onAddNewElement} />}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AirConditioning;

/**
<CarInfoTable
    items={items}
    thead={["Id", "Model", "Actions"]}
    item={["id", "name"]}
    searchTerm={searchTerm}
    onDoubleClick={onDoubleClick}
    handleDelete={handleDelete}
  />
 */
