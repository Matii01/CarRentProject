import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CarCard from "../components/Cards/Cars/CarCard";

function CarsPage() {
  return (
    <Container className="mt-5">
      <Row xs={1} md={3} className="g-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <Col key={idx}>
            <CarCard />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CarsPage;
