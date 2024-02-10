import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";
import MyTableWithPagination from "../../components/Table/MyTableWithPagination";
import MyTable from "../../components/Table/MyTable";
import { useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

function AssignEquipment() {
  const [equipmentList, setEquipmentList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [carEquipment, setCarEquipment] = useState([]);
  const param = useParams();
  const roles = useSelector((state) => state.user.role);

  useEffect(() => {
    getEquipmentList();
    getCarEquipment();
  }, []);

  const getEquipmentList = () => {
    jwtInterceptor
      .get(`CarEquipment`)
      .then((data) => {
        setEquipmentList(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCarEquipment = () => {
    jwtInterceptor
      .get(`CarEquipment/getForCar/${param.carId}`)
      .then((data) => {
        setCarEquipment(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    const { value } = event.target;
    console.log(value);
    setSearchTerm(value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
  };

  const onAddEquipment = (item) => {
    // console.log("item: ");
    // console.log(item);
    jwtInterceptor
      .post(
        "CarEquipment/addEquipment",
        JSON.stringify({
          CarId: param.carId,
          EquipmentId: item.id,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        addCarEquipmentToList(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addCarEquipmentToList = (item) => {
    if (carEquipment.some((x) => x.equipmentId === item.equipmentId)) {
      toast.info("element jest na liście");
      return;
    }

    const newCarEquipment = [item, ...carEquipment];
    setCarEquipment(newCarEquipment);
    toast.success("dodano wyposażenie");
  };

  const onRemoveEquipment = (itemId) => {
    jwtInterceptor
      .delete(`CarEquipment/removeCarEquipmentFromCar/${itemId}`)
      .then((data) => {
        const newList = carEquipment.filter((x) => x.id != itemId);
        setCarEquipment(newList);
        toast.success("Usunięto");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!(roles.includes("Administrator") || roles.includes("CarEditor"))) {
    return <p>Brak uprawnień</p>;
  }

  return (
    <>
      <ToastContainer />
      <Container fluid>
        <Row>
          <Col md="6">
            <Card className="" style={{ marginTop: "0px" }}>
              <Card.Header>
                <Row>
                  <Col className="text-center mb-2">Wyposażenie</Col>
                </Row>
                <Row>
                  <Col className="d-flex justify-content-end">
                    <Form className="d-flex w-75" onSubmit={handleSearch}>
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
                  onChoose={onAddEquipment}
                  onDoubleClick={onAddEquipment}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            <Card className="" style={{ marginTop: "0px" }}>
              <Card.Header>
                <Row>
                  <Col className="text-center mb-2">Wybrane</Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <MyTable
                  thead={["Id", "Nazwa", "Opis", ""]}
                  items={carEquipment}
                  item={["id", "name", "description"]}
                  handleDelete={onRemoveEquipment}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </>
  );
}

export default AssignEquipment;
