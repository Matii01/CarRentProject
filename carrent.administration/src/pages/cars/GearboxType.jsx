import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Form } from "react-bootstrap";
import styles from "./../../components/Table/Table.module.css";
import CarInfoTable from "../../components/Table/CarInfoTable";
import EditGearboxType from "../../components/Gearbox/EditGearbox";
import AddGearbox from "../../components/Gearbox/AddGearbox";
import jwtInterceptor from "../../utils/jwtInterceptor";
import { ToastContainer, toast } from "react-toastify";
import MyTableWithPagination from "../../components/Table/MyTableWithPagination";

function GearboxType() {
  const [gearboxList, setGearboxList] = useState();
  const [searchTerm, setSerachTerm] = useState("");
  const [selectedGearbox, setSelectedGearbox] = useState();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    jwtInterceptor
      .get(`GearboxType`)
      .then((data) => {
        console.log(data);
        setGearboxList(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onDoubleClick = (item) => {
    setSelectedGearbox(item);
    setIsEditMode(true);
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
  };

  const addElement = (gearbox) => {
    const newMakes = [...gearboxList, { ...gearbox }];
    setGearboxList(newMakes);
    toast.success("Dodano");
  };

  const onDeleteClick = (id) => {
    jwtInterceptor
      .delete(`GearboxType/delete/${id}`)
      .then((data) => {
        if (data.status === 204) {
          filterView(id);
          toast.success("Usunięto");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filterView = (id) => {
    const newList = gearboxList.filter((x) => x.id !== id);
    setGearboxList(newList);
  };

  const updateView = (gearbox) => {
    toast.success("Zapisano zmiany");
    const edited = gearboxList.map((x) => {
      if (x.id === gearbox.id) {
        x.name = gearbox.name;
      }
      return x;
    });

    setGearboxList(edited);
    setIsEditMode(false);
  };

  if (!gearboxList) {
    return <p>Loading ...</p>;
  }

  return (
    <>
      <ToastContainer />
      <Container style={{ fontSize: "12px" }}>
        <Row>
          <Col md={6}>
            <Card>
              <Card.Header>
                <Row>
                  <Col className="text-center">
                    <p>Skrzynia biegów</p>
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
                <MyTableWithPagination
                  thead={["Id", "Nazwa", ""]}
                  items={gearboxList}
                  item={["id", "name"]}
                  onDoubleClick={onDoubleClick}
                  handleDelete={onDeleteClick}
                  searchTerm={searchTerm}
                  serachBy={"name"}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            {isEditMode && selectedGearbox && (
              <EditGearboxType
                gearbox={selectedGearbox}
                onCancel={onCancel}
                updateView={updateView}
              />
            )}
            {!isEditMode && <AddGearbox onAdd={addElement} />}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default GearboxType;

/*
<CarInfoTable
    thead={["Id", "Nazwa", "Actions"]}
    items={gearboxList}
    item={["id", "name"]}
    searchTerm={searchTerm}
    onDoubleClick={onDoubleClick}
    handleDelete={onDeleteClick}
  />
*/
