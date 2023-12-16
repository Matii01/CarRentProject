import axios from "axios";
import { useState } from "react";
import { Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function BookCar({ carId }) {
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

  const handleChange = (event) => {
    const { value, name } = event.target;
    setReservationDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Card>
      <Form onSubmit={onSubmit}>
        <Card.Body>
          <Card.Title>Rezerwacja</Card.Title>
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
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Koszt Wynajmu</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Button type="submit" className="w-100 customButton">
            Reserwuj
          </Button>
        </Card.Body>
      </Form>
    </Card>
  );
}

export default BookCar;
