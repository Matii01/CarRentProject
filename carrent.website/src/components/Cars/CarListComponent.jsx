import Link from "next/link";
import { Card, ListGroup, Button, Container, Row, Col } from "react-bootstrap";

function CarListComponent({ car }) {
  return (
    <Card>
      <Card.Img
        variant="top"
        src="https://cdn.pixabay.com/photo/2012/11/02/13/02/car-63930_1280.jpg"
      />
      <Card.Body>
        <Card.Title>{car.name}</Card.Title>
        <Card.Text>{car.description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <Container>
            <Row>
              <Col>KM</Col>
              <Col>250</Col>
            </Row>
          </Container>
        </ListGroup.Item>
        <ListGroup.Item>
          <Container>
            <Row>
              <Col>Fuel</Col>
              <Col>8l / 100</Col>
            </Row>
          </Container>
        </ListGroup.Item>
        <ListGroup.Item>
          <Container>
            <Row>
              <Col>0 - 100</Col>
              <Col>6,5 s</Col>
            </Row>
          </Container>
        </ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link as={Link} href="/cars/1" className="btn btn-primary">
          Card Link
        </Card.Link>
      </Card.Body>
    </Card>
  );
}

export default CarListComponent;
