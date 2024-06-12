import { Row, Col, Card, Container } from "react-bootstrap";
import styles from "./RecommendedCars.module.css";
import { useNavigate } from "react-router-dom";
import { useGetRecomendetCarsQuery } from "../../api/carsApi";

function RecommendedCars() {
  const { data: items, error, isLoading } = useGetRecomendetCarsQuery();

  const navigate = useNavigate();

  const handleCarClick = (id) => {
    navigate(`/car/details/${id}`);
  };

  return (
    <>
      {isLoading ? (
        <div></div>
      ) : (
        <Container className="m-5 w-75">
          <Row className="mb-2">
            <Col>Recommended</Col>
          </Row>
          <Row>
            <div className={styles.scrollableRow}>
              <Row className={styles.row}>
                {items.map((item) => (
                  <Col key={item.carId}>
                    <Card style={{ width: "18rem" }}>
                      <Card.Img
                        className=""
                        variant=""
                        src={item.pictureUrl}
                        onClick={() => handleCarClick(item.carId)}
                        style={{ cursor: "pointer", height: "264px" }}
                      />
                      <Card.Title>{item.name}</Card.Title>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Row>
        </Container>
      )}
    </>
  );
}

export default RecommendedCars;
