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
import AddCarEquipment from "../../components/CarEquipment/AddCarEquipment";
import EditCarEquipment from "../../components/CarEquipment/EditCarEquipment";

function CarEquipment() {
  const [equipmentList, setEquipmentList] = useState([]);
  const [searchTerm, setSerachTerm] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    jwtInterceptor
      .get(`CarEquipment`)
      .then((data) => {
        console.log(data);
        setEquipmentList(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSerachTerm(value);
  };

  const addElement = (equipment) => {
    const newCarEquipment = [equipment, ...equipmentList];
    setEquipmentList(newCarEquipment);

    setSelectedEquipment(equipment);
    setIsEditMode(true);

    toast.success("Dodano");
  };

  const onDoubleClick = (item) => {
    setSelectedEquipment(item);
    setIsEditMode(true);
  };

  const onCancel = () => {
    setIsEditMode(false);
  };

  const onAddClick = () => {};

  const updateView = (equipment) => {
    toast.success("Zapisano zmiany");
    const edited = equipmentList.map((x) => {
      if (x.id === equipment.id) {
        return equipment;
      }
      return x;
    });

    setEquipmentList(edited);
    setIsEditMode(false);
  };

  const onDeleteClick = (itemId) => {
    console.log(itemId);
    jwtInterceptor
      .delete(`CarEquipment/${itemId}`)
      .then((data) => {
        const newList = equipmentList.filter((x) => x.id != itemId);
        setEquipmentList(newList);
        if (selectedEquipment.id == itemId) {
          onCancel();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!equipmentList) {
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
                    <p>Wyposażenie</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button onClick={onAddClick} size="sm">
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
                  thead={["Id", "Nazwa", "Opis", ""]}
                  items={equipmentList}
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
            {isEditMode && selectedEquipment && (
              <EditCarEquipment
                equipment={selectedEquipment}
                onCancel={onCancel}
                updateView={updateView}
              />
            )}
            {!isEditMode && <AddCarEquipment onAdd={addElement} />}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CarEquipment;
