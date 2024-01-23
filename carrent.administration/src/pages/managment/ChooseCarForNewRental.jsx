import { useState } from "react";
import { Col, Card, Form, Row, Button } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";
import transformObjectToQueryString from "../../utils/transformObjectToQuery";
import MyTable from "../../components/Table/MyTable";
import { toast } from "react-toastify";

function ChooseCarForNewRental({ onNext }) {
  const [selectedRentals, setSelectedRentals] = useState([]);
  const [availableCars, setAvailableCars] = useState([]);
  const [selectedDate, setSelectedDate] = useState({
    CarId: 0,
    DateFrom: "",
    DateTo: "",
  });

  const onDateChange = (event) => {
    setAvailableCars([]);
    const { value, name } = event.target;
    setSelectedDate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isInFuture = (dateString) => {
    const selectedDate = new Date(dateString);
    const currentDate = new Date();

    // Set the time of the current date to 00:00:00 for an accurate comparison
    currentDate.setHours(0, 0, 0, 0);

    return selectedDate > currentDate;
  };

  const findCars = (event) => {
    event.preventDefault();

    if (!isInFuture(selectedDate.DateFrom)) {
      toast.error("Nie moższesz wybrać przeszłej daty");
      return;
    }
    if (selectedDate.DateFrom > selectedDate.DateTo) {
      toast.error("Błędne daty");
      return;
    }

    const queryString = transformObjectToQueryString(selectedDate);

    jwtInterceptor
      .get(`/car/carsAndPriceForDates?${queryString}`)
      .then((data) => {
        console.log(data.data);
        setAvailableCars(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addNewRentalItem = (car) => {
    if (selectedRentals.some((item) => item.CarId === car.id)) {
      return;
    }
    setSelectedRentals((prev) => [
      ...prev,
      {
        CarId: car.id,
        DateFrom: selectedDate.DateFrom,
        DateTo: selectedDate.DateTo,
        Name: car.name,
        Price: car.price,
      },
    ]);
  };

  const removeRentalItem = (id) => {
    const array = selectedRentals.filter((item) => item.CarId !== id);
    setSelectedRentals(array);
  };

  const nextClick = () => {
    if (selectedRentals.length < 1) {
      toast.error(`Wybierz samochód`);
      return;
    }
    onNext(selectedRentals);
  };

  return (
    <>
      <Card>
        <Card.Header></Card.Header>
        <Card.Body>
          <Form onSubmit={findCars}>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Od</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    name="DateFrom"
                    value={selectedDate.DateFrom}
                    onChange={onDateChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Do</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    name="DateTo"
                    value={selectedDate.DateTo}
                    onChange={onDateChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Button className="mt-4" variant="dark" size="sm" type="submit">
                  Szukaj
                </Button>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                {availableCars && (
                  <MyTable
                    thead={["ID", "Name", "Price", "Action"]}
                    item={["id", "name", "price"]}
                    items={availableCars}
                    onChoose={addNewRentalItem}
                  />
                )}
              </Col>
            </Row>
            <Row>
              <Row>
                <Col>Wybrane: </Col>
              </Row>
              <Row className="mt-1">
                <Col>
                  {availableCars && (
                    <MyTable
                      ItemId={"CarId"}
                      thead={["ID", "Name", "Price", "Od", "Do", "Action"]}
                      item={["CarId", "Name", "Price", "DateFrom", "DateTo"]}
                      items={selectedRentals}
                      handleDelete={removeRentalItem}
                    />
                  )}
                </Col>
              </Row>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      <Row className="mt-5 d-flex justify-content-center">
        <Col xl={9}>
          <Row>
            <Col>
              <Button variant="dark" size="sm" className="w-100">
                Powrót
              </Button>
            </Col>
            <Col>
              <Button
                variant="dark"
                size="sm"
                className="w-100"
                onClick={nextClick}
              >
                Dalej
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default ChooseCarForNewRental;
