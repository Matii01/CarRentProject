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
import jwtInterceptor from "../../utils/jwtInterceptor";
import Permissions from "../../components/Workers/Permissions";
import EditWorkerSidebar from "../../components/Workers/EditWorkerSidebar";
import AddNewWorker from "../../components/Workers/AddNewWorker";
import MyTableWithPagination from "../../components/Table/MyTableWithPagination";
import { ToastContainer, toast } from "react-toastify";
import DeleteWorker from "../../components/Users/DeleteWorker";
import { useSelector } from "react-redux";

function WorkersPage() {
  const [error, setError] = useState();
  const [workerList, setWorkerList] = useState([]);
  const [searchTerm, setSerachTerm] = useState("");
  const [selectedWorker, setSelectedWorker] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const roles = useSelector((state) => state.user.role);
  const navigate = useNavigate();

  useEffect(() => {
    getWorkers();
  }, []);

  const getWorkers = () => {
    jwtInterceptor
      .get(`Users/allWorkers`)
      .then((data) => {
        console.log(data);
        setWorkerList(data.data);
      })
      .catch((error) => {
        if (error.response.status) {
          toast.error("Brak uprawnień");
          setError("Brak uprawnień");
        }
      });
  };

  const handleSearch = (event) => {
    event.preventDefault();
  };

  const onDoubleClick = (id) => {
    console.log(id);
    setSelectedWorker(id);
    setIsEditMode(true);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    console.log(value);
    setSerachTerm(value);
  };

  const onAddWorker = () => {
    setIsEditMode(false);
  };

  const workerAdded = (worker) => {
    const newWorkerList = [worker, ...workerList];
    setWorkerList(newWorkerList);
    onDoubleClick(worker);
  };

  const onDeleteWorker = () => {
    setIsEditMode(false);
    setSelectedWorker("");
    getWorkers();
  };

  if (!roles.includes("Administrator")) {
    return <p>Brak uprawnień</p>;
  }

  if (error) {
    return <p>{error}</p>;
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
                    <p>Pracownicy</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={onAddWorker}
                    >
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
                        Szukaj
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <MyTableWithPagination
                  thead={["Imie", "Nazwisko", "email"]}
                  items={workerList}
                  item={["firstName", "lastName", "email"]}
                  onDoubleClick={onDoubleClick}
                  searchTerm={searchTerm}
                  serachBy={"firstName"}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md="6">
            {isEditMode && selectedWorker && (
              <Card>
                <Card.Header>
                  <h5>
                    {selectedWorker.firstName} {selectedWorker.lastName}
                  </h5>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                      <Tabs>
                        <Tab eventKey="pe" title="Uprawnienia">
                          <Permissions workerId={selectedWorker.id} />
                        </Tab>
                        <Tab eventKey="sidebar" title="Meu boczne">
                          <EditWorkerSidebar workerId={selectedWorker.id} />
                        </Tab>
                        <Tab eventKey="delete" title="Usuwanie">
                          <DeleteWorker
                            onDelete={onDeleteWorker}
                            workerId={selectedWorker.id}
                          />
                        </Tab>
                      </Tabs>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}
            {!isEditMode && <AddNewWorker onAdd={workerAdded} />}
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default WorkersPage;
