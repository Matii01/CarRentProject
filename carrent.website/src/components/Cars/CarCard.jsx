import { Button, Card, Image, Container, Row, Col } from "react-bootstrap";
//import styled from "styled-components";

export default function CarCard({ car }) {
  const goToCarDetails = () => {
    //router.push(`/cars/${car.id}`);
  };

  // const Item = styled.div`
  //   padding: 1.2rem;
  //   text-align: center;
  //   background-color: ${({ themeMode }) =>
  //     themeMode === "dark" ? "#1A2027" : "#fff"};
  //   color: #666; // Assuming a generic gray for text.secondary. Adjust as needed.
  // `;
  const divClass = "border border-1 rounded p-1 text-center";

  return (
    <Card style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)" }}>
      <Card.Body onClick={goToCarDetails} style={{ cursor: "pointer" }}>
        <Image
          src="https://cdn.pixabay.com/photo/2012/11/02/13/02/car-63930_1280.jpg"
          alt="green iguana"
          style={{ borderRadius: "8px" }}
          fluid
        />
      </Card.Body>
      <Card.Body>
        <Card.Title>{car.name}</Card.Title>
        <Card.Text>{car.description}</Card.Text>
      </Card.Body>
      <Card.Body>
        <Container fluid="large">
          <Row className="mb-1">
            <Col>
              <div className={divClass}>1</div>
            </Col>
            <Col>
              <div className={divClass}>2</div>
            </Col>
          </Row>
          <Row className="mb-1">
            <Col>
              <div className={divClass}>3</div>
            </Col>
            <Col>
              <div className={divClass}>4</div>
            </Col>
          </Row>
        </Container>
      </Card.Body>
      <Card.Body>
        <Container fluid="large">
          <Row className="mb-1">
            <Col>Price</Col>
            <Col>666 $</Col>
          </Row>
        </Container>
      </Card.Body>
      <Card.Footer>
        <Container fluid="xl">
          <Row>
            <Col className="text-center p-1">
              <Button variant="primary" size="lg" style={{ width: "90%" }}>
                Details
              </Button>
            </Col>
            <Col className="text-center p-1">
              <Button variant="primary" size="lg" style={{ width: "90%" }}>
                Add to
              </Button>
            </Col>
          </Row>
        </Container>
      </Card.Footer>
    </Card>
  );
}
