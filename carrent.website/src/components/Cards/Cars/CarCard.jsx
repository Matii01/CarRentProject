import { Button, Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

function CarColItem({ icon, value }) {
  return (
    <>
      <div
        className="p-1 m-2"
        style={{
          border: "1px solid lightgrey",
          borderRadius: "5px",
          color: "gray",
        }}
      >
        <i className={icon}></i>
        {value}
      </div>
    </>
  );
}

function CarCard({ car }) {
  const navigate = useNavigate();
  const handleCarClick = (id) => {
    navigate(`/car/details/${id}`);
  };

  const temp = {
    ac: "manualna",
    engine: "benzynowy",
    gearbox: "manulana",
    id: 1,
    make: "Skoda",
    name: "Skoda Fabia IV",
    pictureUrl: "",
    price: 0,
  };

  if (car) {
    let url = car.pictureUrl;
    if (car.pictureUrl === "") {
      url =
        "https://cdn.pixabay.com/photo/2012/11/02/13/02/car-63930_960_720.jpg%201x,%20https://cdn.pixabay.com/photo/2012/11/02/13/02/car-63930_1280.jpg";
    }

    return (
      <Card className="customCard">
        {/* <Card.Img src="imgs/car-login.jpg" /> */}
        <Card.Img
          className="p-3 roundedImg"
          variant="top"
          src={url}
          onClick={() => handleCarClick(car.id)}
          style={{ cursor: "pointer", height: "264px" }}
        />

        <Card.Body>
          <Card.Title>{car.name}</Card.Title>
          <Row>
            <Col className="text-center p-1">
              <CarColItem icon="fa-solid fa-gears" value={car.engine} />
            </Col>
            <Col className="text-center p-1">
              <CarColItem
                icon="fa-solid fa-gauge-simple-high"
                value={car.acceleration}
              />
            </Col>
          </Row>
          <Row>
            <Col className="text-center p-1">
              <CarColItem text="gearbox" value={car.gearbox} />
            </Col>
            <Col className="text-center p-1">
              <CarColItem text="napęd" value={`${car.horsepower} KM`} />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>Cena</Col>
            <Col className="text-end me-3 fs-5">500zł</Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Row>
            <Col className="text-center p-1">
              <Button className="customButton w-75">Details</Button>
            </Col>
            <Col className="text-center p-1">
              <Button className="customButton w-75">Rental</Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    );
  }
}

export default CarCard;
