import { Button, Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import AddToWishList from "./../../WishList/AddToWishList";
import LinkWithHint from "../../Hints/LinkWithHint";

function CarColItem({ icon, value, hint }) {
  return (
    <>
      <LinkWithHint title={hint}>
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
      </LinkWithHint>
    </>
  );
}

function CarCard({ car, isLogin, wishlist }) {
  const navigate = useNavigate();
  const handleCarClick = (id) => {
    navigate(`/car/details/${id}`);
  };

  const goToReservation = (id) => {
    navigate(`/car/reservation/${id}`);
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
          <Card.Title>
            <Row>
              <Col xl={9}>{car.name}</Col>
              <Col className="d-flex justify-content-end me-1">
                {isLogin && (
                  <AddToWishList carId={car.id} wishlist={wishlist} />
                )}
              </Col>
            </Row>
          </Card.Title>
          <Row>
            <Col className="text-center p-1">
              <CarColItem
                icon="fa-solid fa-gears"
                value={car.engine}
                hint="engine type"
              />
            </Col>
            <Col className="text-center p-1">
              <CarColItem
                icon="fa-solid fa-gauge-simple-high"
                value={car.acceleration}
                hint="acceleration"
              />
            </Col>
          </Row>
          <Row>
            <Col className="text-center p-1">
              <CarColItem text="gearbox" value={car.gearbox} hint="gearbox" />
            </Col>
            <Col className="text-center p-1">
              <CarColItem
                text="napęd"
                value={`${car.horsepower} HP`}
                hint="horsepower"
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>Cena</Col>
            <Col className="text-end me-3 fs-5">{`${car.price} zł`}</Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Row>
            <Col className="text-center p-1">
              <Button
                className="customButton w-75"
                onClick={() => handleCarClick(car.id)}
              >
                Details
              </Button>
            </Col>
            <Col className="text-center p-1">
              <Button
                className="customButton w-75"
                onClick={() => goToReservation(car.id)}
              >
                Rental
              </Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    );
  }
}

export default CarCard;
