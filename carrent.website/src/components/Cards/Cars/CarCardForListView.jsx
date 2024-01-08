import { Col, Image, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

function CarCardForListView({ car }) {
  const navigate = useNavigate();
  const handleCarClick = (id) => {
    navigate(`/car/details/${id}`);
  };

  if (car) {
    return (
      <>
        <Card className="mt-4">
          <Row>
            <Col xs={6} md={4}>
              <Image
                style={{ borderRadius: "4px" }}
                fluid
                src="https://cdn.pixabay.com/photo/2012/11/02/13/02/car-63930_1280.jpg"
              ></Image>
            </Col>
            <Col>
              <Row>
                <Col>{car.name}</Col>
              </Row>
              <Row>
                <Col>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Col>
              </Row>
              <Row>
                <Col>{car.ac}</Col>
                <Col>{car.engine}</Col>
                <Col>{car.gearbox}</Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </>
    );
  }

  return (
    <Card>
      <Card.Img
        variant="top"
        src="https://cdn.pixabay.com/photo/2012/11/02/13/02/car-63930_1280.jpg"
      />
      <Card.Body>
        <Card.Title>Card title</Card.Title>
        <Card.Text>
          This is a longer card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CarCardForListView;
