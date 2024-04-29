import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button, Form } from "react-bootstrap";
import CarInfoTable from "../../components/Table/CarInfoTable";
import EditKilometreLimit from "../../components/KilometreLimit/EditKilometreLimit";
import AddKilometreLimit from "../../components/KilometreLimit/AddKilometreLimit";
import jwtInterceptor from "../../utils/jwtInterceptor";
import MyTableWithPagination from "../../components/Table/MyTableWithPagination";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

function KilometreLimit() {
  const [items, setItems] = useState();
  const [searchTerm, setSerachTerm] = useState("");
  const [isEditMode, setIEditMode] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const roles = useSelector((state) => state.user.role);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    jwtInterceptor.get("KilometrLimit").then((results) => {
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
    jwtInterceptor.delete(`KilometrLimit/${id}`).then((results) => {
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

  if (
    !(roles.includes("Administrator") || roles.includes("CarDetailsEditor"))
  ) {
    return <p>Brak uprawnień</p>;
  }

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
                    <p>Limity kilometrów</p>
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
                  thead={["Id", "Wartość", ""]}
                  item={["id", "limitValue"]}
                  searchTerm={searchTerm}
                  serachBy={"limitValue"}
                  onDoubleClick={onDoubleClick}
                  handleDelete={handleDelete}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            {isEditMode && (
              <EditKilometreLimit
                editItem={selectedItem}
                onCancel={onCancel}
                updateView={updateView}
              />
            )}
            {!isEditMode && <AddKilometreLimit onAdd={onAddNewElement} />}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default KilometreLimit;

/* 
<CarInfoTable
      items={items}
      thead={["Id", "Wartość", "Actions"]}
      item={["id", "limitValue"]}
      searchTerm={searchTerm}
      filterBy="name"
      onDoubleClick={onDoubleClick}
      handleDelete={handleDelete}
    />
*/
