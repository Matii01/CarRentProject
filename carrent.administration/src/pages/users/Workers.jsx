import { useEffect, useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Form,
  Tab,
  Tabs,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import CarInfoTable from "../../components/Table/CarInfoTable";
import jwtInterceptor from "../../utils/jwtInterceptor";
import Permissions from "../../components/Workers/Permissions";
import EditWorkerSidebar from "../../components/Workers/EditWorkerSidebar";

function WorkersPage() {
  const [workerList, setWorkerList] = useState([]);
  const [searchTerm, setSerachTerm] = useState("");
  const [selectedWorker, setSelectedWorker] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    jwtInterceptor
      .get(`Users/allWorkers`)
      .then((data) => {
        console.log(data);
        setWorkerList(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
  };

  const onDoubleClick = (id) => {
    setSelectedWorker(id.id);
  };
  const handleChange = () => {};

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
                  items={workerList}
                  item={["firstName", "lastName", "email"]}
                  searchTerm={searchTerm}
                  onDoubleClick={onDoubleClick}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            {selectedWorker && (
              <Tabs>
                <Tab eventKey="pe" title="Uprawnienia">
                  <Permissions workerId={selectedWorker} />
                </Tab>
                <Tab eventKey="sidebar" title="Sidebar">
                  <EditWorkerSidebar workerId={selectedWorker} />
                </Tab>
              </Tabs>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default WorkersPage;
