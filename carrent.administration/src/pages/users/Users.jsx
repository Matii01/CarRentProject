import { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Form } from "react-bootstrap";
import CarInfoTable from "../../components/Table/CarInfoTable";
import jwtInterceptor from "../../utils/jwtInterceptor";
import ManageUser from "../../components/Users/ManageUser";
import { ToastContainer } from "react-toastify";
import MyTableWithPagination from "../../components/Table/MyTableWithPagination";

function UsersPage() {
  const [usersList, setUsersList] = useState([]);
  const [searchTerm, setSerachTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    jwtInterceptor
      .get(`Users/allUsers`)
      .then((data) => {
        console.log(data);
        setUsersList(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onCancel = () => {};

  const handleChange = (event) => {
    const { value } = event.target;
    setSerachTerm(value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
  };

  const onDoubleClick = (item) => {
    console.log(item);
    setSelectedUser(item);
  };

  if (!usersList) {
    return <p>Loading ... </p>;
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
                  thead={["Imie", "Nazwisko", "email"]}
                  items={usersList}
                  item={["firstName", "lastName", "email"]}
                  searchTerm={searchTerm}
                  serachBy={"firstName"}
                  onDoubleClick={onDoubleClick}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">{selectedUser && <ManageUser user={selectedUser} />}</Col>
        </Row>
      </Container>
    </>
  );
}
export default UsersPage;
