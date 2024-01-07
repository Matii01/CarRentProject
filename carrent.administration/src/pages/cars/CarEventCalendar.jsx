import { Button, Card, Col, Container, Row } from "react-bootstrap";
import styles from "./../../components/Table/Table.module.css";
import AddNewEvent from "../../components/CalendarEvent/AddNewEvent";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import transformObjectToQuery from "../../utils/transformObjectToQuery";
import jwtInterceptor from "../../utils/jwtInterceptor";
import { formatDate } from "../../utils/formDate";
import EditService from "../../components/CalendarEvent/EditService";

function CarEventCalendar() {
  const param = useParams();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [editedId, setEditedId] = useState();
  const [rentals, setRentals] = useState([]);
  const [service, setService] = useState([]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [filterRental, setFilterRental] = useState({
    carId: param.carId,
    PageNumber: 1,
    PageSize: 10,
  });
  const [filterService, setFilterService] = useState({
    carId: param.carId,
    PageNumber: 1,
    PageSize: 10,
  });

  useEffect(() => {
    getRentals();
    getService();
  }, []);

  const getRentals = () => {
    const queryString = transformObjectToQuery(filterRental);
    jwtInterceptor
      .get(`https://localhost:7091/Rental/AllRentals?${queryString}`)
      .then((data) => {
        console.log(data);
        setRentals(data.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getService = () => {
    const queryString = transformObjectToQuery(filterService);
    jwtInterceptor
      .get(`https://localhost:7091/CarMaintenance/All?${queryString}`)
      .then((data) => {
        console.log(data);
        setService(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = (id) => {
    navigate(`/rentals/details/${id}`);
  };

  const hide = () => {
    setShowAddEvent(false);
  };

  const ServiseEdit = (id) => {
    setEditedId(id);
    setIsEdit(true);
  };

  const onAddClick = () => {
    setShowAddEvent(true);
    setIsEdit(false);
  };

  return (
    <>
      <Container>
        <Row className="mt-2 mb-2">
          <Col>
            <Button onClick={onAddClick}>Dodaj</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Header>Wypożyczenia</Card.Header>
              <Card.Body>
                <table
                  className={`${styles.table}`}
                  style={{
                    fontSize: "12px",
                  }}
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nazwa</th>
                      <th>Data od</th>
                      <th>Data do</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rentals &&
                      rentals.map((it) => (
                        <tr key={it.id}>
                          <td>{it.id}</td>
                          <td>{it.carName}</td>
                          <td>{formatDate(it.rentalStart)}</td>
                          <td>{formatDate(it.rentalEnd)}</td>
                          <td>{it.status}</td>
                          <td>
                            <Button
                              size="sm"
                              onClick={() => handleClick(it.id)}
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>Serwisy</Card.Header>
              <Card.Body>
                <table
                  className={`${styles.table}`}
                  style={{
                    fontSize: "12px",
                  }}
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nazwa</th>
                      <th>Data od</th>
                      <th>Data do</th>
                      <th>Koszt</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {service &&
                      service.map((it) => (
                        <tr key={it.id}>
                          <td>{it.id}</td>
                          <td>{it.carName}</td>
                          <td>{formatDate(it.dateStart)}</td>
                          <td>{formatDate(it.dateEnd)}</td>
                          <td>{it.totalCost}</td>
                          <td>
                            <Button
                              size="sm"
                              onClick={() => ServiseEdit(it.id)}
                            >
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </Card.Body>
            </Card>
          </Col>
          {showAddEvent && (
            <Col md={6}>
              <AddNewEvent onCancel={hide} />
            </Col>
          )}
          {isEdit && (
            <Col md={6}>
              <EditService id={editedId} setIsEdit={() => setIsEdit(false)} />
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}

export default CarEventCalendar;
