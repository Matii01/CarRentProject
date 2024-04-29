import { Button, Card, Col, Container, Row } from "react-bootstrap";
import styles from "./../../components/Table/Table.module.css";
import AddNewEvent from "../../components/CalendarEvent/AddNewEvent";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import transformObjectToQuery from "../../utils/transformObjectToQuery";
import jwtInterceptor from "../../utils/jwtInterceptor";
import { formatDate } from "../../utils/formDate";
import EditService from "../../components/CalendarEvent/EditService";
import MyTableWithPagination from "../../components/Table/MyTableWithPagination";
import { ToastContainer } from "react-toastify";

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
      .get(`Rental/AllRentals?${queryString}`)
      .then((data) => {
        console.log(data);
        setRentals(data.data.items);
        transformAndSetRental(data.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const transformAndSetRental = (items) => {
    const transformed = items.map((it) => ({
      ...it,
      rentalStart: formatDate(it.rentalStart),
      rentalEnd: formatDate(it.rentalEnd),
    }));
    setRentals(transformed);
  };

  const getService = () => {
    const queryString = transformObjectToQuery(filterService);
    jwtInterceptor
      .get(`CarMaintenance/All?${queryString}`)
      .then((data) => {
        transformAndSetService(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const transformAndSetService = (items) => {
    const transformed = items.map((it) => ({
      ...it,
      dateStart: formatDate(it.dateStart),
      dateEnd: formatDate(it.dateEnd),
    }));
    setService(transformed);
  };

  const handleClick = (id) => {
    navigate(`/rentals/details/${id}`);
  };

  const hide = () => {
    setShowAddEvent(false);
  };

  const ServiseEdit = (id) => {
    console.log(id);
    setEditedId(id.id);
    setIsEdit(true);
    setShowAddEvent(false);
  };

  const onAddClick = () => {
    setShowAddEvent(true);
    setIsEdit(false);
  };

  const refreshView = () => {
    getService();
  };

  return (
    <>
      <ToastContainer />
      <Container>
        <Row className="mt-2 mb-2"></Row>
        <Row>
          <Col>
            <Card>
              <Card.Header>Wypożyczenia </Card.Header>
              <Card.Body>
                <MyTableWithPagination
                  thead={["ID", "Nazwa", "Data od", "Data do", "Status"]}
                  items={rentals}
                  item={["id", "name", "rentalStart", "rentalEnd", "status"]}
                />
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <Row>
                  <Col>Serwisy</Col>
                  <Col>
                    <Button variant="dark" size="sm" onClick={onAddClick}>
                      Dodaj
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <MyTableWithPagination
                  thead={["ID", "Nazwa", "Data od", "Data do", "Koszt"]}
                  items={service}
                  item={["id", "carName", "dateStart", "dateEnd", "totalCost"]}
                  onDoubleClick={ServiseEdit}
                />
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
              <EditService
                id={editedId}
                setIsEdit={() => setIsEdit(false)}
                onEdited={refreshView}
              />
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}

export default CarEventCalendar;

/**
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
 */
