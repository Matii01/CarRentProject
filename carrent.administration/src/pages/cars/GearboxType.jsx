import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Form } from "react-bootstrap";
import styles from "./../../components/Table/Table.module.css";
import CarInfoTable from "../../components/Table/CarInfoTable";
import EditGearboxType from "../../components/Gearbox/EditGearbox";

function GearboxType() {
  const [gearboxList, setGearboxList] = useState();
  const [searchTerm, setSerachTerm] = useState("");
  const [selectedGearbox, setSelectedGearbox] = useState();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    axios
      .get(`https://localhost:7091/GearboxType/all`)
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

  const updateView = () => {};

  if (!gearboxList) {
    return <p>Loading ...</p>;
  }

  return (
    <>
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
                <CarInfoTable
                  thead={["Id", "Nazwa", "Actions"]}
                  items={gearboxList}
                  item={["id", "name"]}
                  searchTerm={searchTerm}
                  onDoubleClick={onDoubleClick}
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
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default GearboxType;
