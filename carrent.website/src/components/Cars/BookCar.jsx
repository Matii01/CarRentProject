import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import transformObjectToQueryString from "../../utils/transformObjectToQuery";
import MyDatePicker from "../DatePicker/MyDatePicker";

function BookCar({ carId, excludedDates }) {
  const [error, setError] = useState({ isError: false });
  const [cost, setCost] = useState("");
  const [reservationData, setReservationDate] = useState({
    carId: carId,
    DateFrom: "",
    DateTo: "",
  });
  const navigation = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    if (reservationData.from > reservationData.to) {
      console.log("error");
    } else {
      console.log(reservationData);
      bookCar();
    }
  };

  const bookCar = () => {
    console.log(reservationData);
    axios
      .post(
        `https://localhost:7091/Rental/IsDateAvailable`,
        JSON.stringify(reservationData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log(data);
        if (data.data === true) {
          navigation(
            `/car/reservation/${carId}?from=${reservationData.DateFrom}&to=${reservationData.DateTo}`
          );
        } else {
          console.log("wybierz inna data");
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (reservationData.DateFrom < reservationData.DateTo) {
      console.log(reservationData);
      checkPrice();
    }
  }, [reservationData.DateFrom, reservationData.DateTo]);

  const checkPrice = () => {
    const queryString = transformObjectToQueryString(reservationData);
    axios
      .get(`https://localhost:7091/Rental/CheckPrice?${queryString}`)
      .then((data) => {
        setCost(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isDatesValid = () => {
    excludedDates.forEach((element) => {
      if (
        new Date(reservationData.DateFrom) <= new Date(element.rentalStart) &&
        new Date(reservationData.DateTo) >= new Date(element.rentalEnd)
      ) {
        setError((prev) => ({
          ...prev,
          isError: true,
        }));
        return;
      } else {
        setError((prev) => ({
          ...prev,
          isError: false,
        }));
      }
    });
  };

  const handleDate = (name, value) => {
    setReservationDate((prev) => ({
      ...prev,
      [name]: value,
    }));
    isDatesValid();
  };

  return (
    <Card>
      <Form onSubmit={onSubmit}>
        <Card.Body>
          <Card.Title>Rezerwacja</Card.Title>
          <Row>
            <Col>
              <MyDatePicker
                onChange={handleDate}
                excludedDate={excludedDates}
              />
            </Col>
          </Row>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Rental Cost: {cost}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Button
            type="submit"
            className="w-100 customButton"
            disabled={error.isError}
          >
            Book
          </Button>
          {error.isError && <p>error</p>}
        </Card.Body>
      </Form>
    </Card>
  );
}

export default BookCar;

/*
<Row>
  <Col>
    <Form.Group as={Col}>
      <Form.Label>Od</Form.Label>
      <Form.Control
        type="date"
        name="DateFrom"
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group as={Col}>
      <Form.Label>Do</Form.Label>
      <Form.Control
        type="date"
        name="DateTo"
        onChange={handleChange}
      />
    </Form.Group>
  </Col>
</Row>
*/
