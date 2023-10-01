import { Row, Col, Container } from "react-bootstrap";
import CarCard from "./../../components/Cars/CarCard";

export default function Cars() {
  const cars = [
    { id: 1, name: "Ford Mustang", description: "Description for Car 1" },
    { id: 2, name: "BMW M4", description: "Description for Car 2" },
    { id: 3, name: "Mercedes", description: "Description for Car 3" },
    { id: 4, name: "Skoda Octavia RS", description: "Description for Car 4" },
    { id: 5, name: "Audi RS3", description: "Description for Car 5" },
  ];

  return (
    <Container>
      <Row xs={1} md={2} lg={3} className="g-4">
        {cars.map((car) => (
          <Col key={car.id}>
            <CarCard car={car} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
