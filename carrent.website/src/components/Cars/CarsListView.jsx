import { Col, Container, Row } from "react-bootstrap";
import CarCardForListView from "../Cards/Cars/CarCardForListView";

function CarsListView({ cars }) {
  return (
    <>
      {cars.map((car) => (
        <CarCardForListView car={car} key={car.id} />
      ))}
    </>
  );
}

export default CarsListView;
