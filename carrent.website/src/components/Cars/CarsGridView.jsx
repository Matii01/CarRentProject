import { Col, Row } from "react-bootstrap";
import CarCard from "../Cards/Cars/CarCard";

function CarsGridView({ cars, isLogin, wishlist }) {
  return (
    <>
      {cars && (
        <Row xs={1} md={3} className="g-4">
          {cars.map((car) => (
            <Col key={car.id} className="ps-md-4 pe-md-4 mt-md-5">
              <CarCard car={car} isLogin={isLogin} wishlist={wishlist} />
            </Col>
          ))}
        </Row>
      )}
      {!cars && (
        <Row xs={1} md={3} className="g-4">
          <Col>Empty car list</Col>
        </Row>
      )}
    </>
  );
}

export default CarsGridView;
