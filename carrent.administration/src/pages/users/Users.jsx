import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Form } from "react-bootstrap";
import styles from "./../../components/Table/Table.module.css";
import CarInfoTable from "../../components/Table/CarInfoTable";
import EditGearboxType from "../../components/Gearbox/EditGearbox";

function UsersPage() {
  const [usersList, setUsersList] = useState([]);
  const [searchTerm, setSerachTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    axios
      .get(`https://localhost:7091/Users/all?roleName=User`)
      .then((data) => {
        console.log(data);
        setUsersList(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onCancel = () => {};
  const handleChange = () => {};
  const handleSearch = (event) => {
    event.preventDefault();
  };
  const onDoubleClick = () => {};

  if (!usersList) {
    return <p>Loading ... </p>;
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
                    <p>Klienci</p>
                  </Col>
                </Row>
                <Row>
                  <Col></Col>
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
                  thead={["Imie", "Nazwisko", "email", "Actions"]}
                  items={usersList}
                  item={["firstName", "lastName", "email"]}
                  searchTerm={searchTerm}
                  onDoubleClick={onDoubleClick}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md="6"></Col>
        </Row>
      </Container>
    </>
  );
}
export default UsersPage;
