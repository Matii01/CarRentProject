import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button, Form } from "react-bootstrap";
import CarInfoTable from "../../components/Table/CarInfoTable";
import EditConditioning from "../../components/AirConditioning/EditConditioning";
import AddConditioning from "../../components/AirConditioning/AddConditioning";

function AirConditioning() {
  const [items, setItems] = useState();
  const [searchTerm, setSerachTerm] = useState("");
  const [isEditMode, setIEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get("https://localhost:7091/AirConditioning").then((results) => {
      console.log(results);
      setItems(results.data);
    });
  };

  const onDoubleClick = (item) => {
    setSelectedItem(item);
    setIEditMode(true);
  };

  const handleDelete = (id) => {
    console.log("delete: " + id);
    axios
      .delete(`https://localhost:7091/AirConditioning/${id}`)
      .then((results) => {
        getData();
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

  const updateView = () => {
    getData();
  };

  if (items == null) {
    return <p>Loading ... </p>;
  }
  return (
    <>
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
                  items={items}
                  thead={["Id", "Model", "Actions"]}
                  item={["id", "name"]}
                  searchTerm={searchTerm}
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
            {!isEditMode && <AddConditioning onAdd={updateView} />}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AirConditioning;
