import { useEffect, useState } from "react";
import { Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MyDatePicker from "../DatePicker/MyDatePicker";
import { useSelector } from "react-redux";
import {
  useCheckPriceForNotLoggedInQuery,
  useCheckPriceForUserQuery,
} from "../../api/carsApi";

function BookCar({ carId, excludedDates }) {
  const user = useSelector((state) => state.user);
  const navigation = useNavigate();
  const [error, setError] = useState(false);
  const [canBook, setCanBook] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [reservationData, setReservationDate] = useState({
    carId: carId,
    dateFrom: "",
    dateTo: "",
  });

  const {
    data: costForUser,
    dataError,
    isLoading,
  } = useCheckPriceForUserQuery(reservationData, {
    skip: !shouldFetch || !user.isLogin,
  });
  const {
    data: cost,
    err,
    isLoad,
  } = useCheckPriceForNotLoggedInQuery(reservationData, {
    skip: !shouldFetch || user.isLogin,
  });

  useEffect(() => {
    if (reservationData.dateFrom === "") {
      return;
    }
    if (reservationData.dateFrom < reservationData.dateTo) {
      setShouldFetch(true);
      setCanBook(true);
      isDatesValid();
    } else {
      setCanBook(false);
    }
  }, [reservationData.dateFrom, reservationData.dateTo]);

  function onSubmit(event) {
    event.preventDefault();
    navigation(
      `/car/reservation/${carId}?from=${reservationData.dateFrom}&to=${reservationData.dateTo}`
    );
  }

  function isDatesValid() {
    excludedDates.forEach((element) => {
      if (
        new Date(reservationData.dateFrom) <= new Date(element.rentalStart) &&
        new Date(reservationData.dateTo) >= new Date(element.rentalEnd)
      ) {
        setError(true);
        return false;
      } else {
        setError(false);
      }
    });
  }

  function handleDate(name, value) {
    setReservationDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <Card>
      <Form onSubmit={onSubmit}>
        <Card.Body>
          <Card.Title>Rezerwacja</Card.Title>
          <Row>
            <Col>
              <MyDatePicker
                onBlur={isDatesValid}
                onChange={handleDate}
                excludedDate={excludedDates}
              />
            </Col>
          </Row>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Rental Cost: {cost | costForUser}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Button
            type="submit"
            className={`w-100 customButton ${error ? "errorButton" : ""}`}
            disabled={error || !canBook}
          >
            Book
          </Button>
          {error && <p>Includes exemptions</p>}
        </Card.Body>
      </Form>
    </Card>
  );
}

export default BookCar;

/* 
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import transformObjectToQueryString from "../../utils/transformObjectToQuery";
import MyDatePicker from "../DatePicker/MyDatePicker";
import axiosInstance from "../../utils/axiosConfig";
import { useSelector } from "react-redux";
import { useCheckPriceForUserQuery } from "../../api/carsApi";

function BookCar({ carId, excludedDates }) {
  const [error, setError] = useState(false);
  const [cost, setCost] = useState("");
  const [reservationData, setReservationDate] = useState({
    carId: carId,
    DateFrom: "",
    DateTo: "",
  });

  const { data, dataError, isLoading } = useCheckPriceForUserQuery(
    transformObjectToQueryString(reservationData),
    {
      skip: isDatesValid(),
    }
  );

  const user = useSelector((state) => state.user);
  const navigation = useNavigate();

  useEffect(() => {
    if (reservationData.DateFrom < reservationData.DateTo) {
      console.log(reservationData);
      checkPrice();
      isDatesValid();
    }
  }, [reservationData.DateFrom, reservationData.DateTo]);

  useEffect(() => {
    console.log(error);
    if (error) {
    }
  }, [error]);

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
    axiosInstance
      .post(`Rental/IsDateAvailable`, JSON.stringify(reservationData), {
        headers: {
          "Content-Type": "application/json",
        },
      })
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

  const checkPrice = () => {
    if (user.isLogin) {
      checkPriceForUser();
    } else {
      checkPriceForLoggedOff();
    }
  };

  const checkPriceForUser = () => {
    const queryString = transformObjectToQueryString(reservationData);
    axiosInstance
      .get(`Rental/CheckPriceForClient?${queryString}`)
      .then((data) => {
        setCost(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkPriceForLoggedOff = () => {
    const queryString = transformObjectToQueryString(reservationData);
    axios
      .get(`Rental/CheckPrice?${queryString}`)
      .then((data) => {
        setCost(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function isDatesValid() {
    excludedDates.forEach((element) => {
      if (
        new Date(reservationData.DateFrom) <= new Date(element.rentalStart) &&
        new Date(reservationData.DateTo) >= new Date(element.rentalEnd)
      ) {
        setError(true);
        return false;
      } else {
        setError(false);
      }
    });
    return true;
  }

  const handleDate = (name, value) => {
    setReservationDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log("cost and data: ", data);

  return (
    <Card>
      <Form onSubmit={onSubmit}>
        <Card.Body>
          <Card.Title>Rezerwacja</Card.Title>
          <Row>
            <Col>
              <MyDatePicker
                onBlur={isDatesValid}
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
            className={`w-100 customButton ${error ? "errorButton" : ""}`}
            disabled={error}
          >
            Book
          </Button>
          {error && <p>Includes exemptions</p>}
        </Card.Body>
      </Form>
    </Card>
  );
}

export default BookCar;

*/
