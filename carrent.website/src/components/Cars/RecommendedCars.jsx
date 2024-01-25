import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosConfig";
import { Row, Col, Card, Container } from "react-bootstrap";
import styles from "./RecommendedCars.module.css";
import { useNavigate } from "react-router-dom";

function RecommendedCars() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance
      .get(`car/recommended`)
      .then((data) => {
        console.log(data.data);
        setItems(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCarClick = (id) => {
    navigate(`/car/details/${id}`);
  };

  return (
    <>
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
    </>
  );
}

export default RecommendedCars;

/**
 * 
 *  {items.map((item) => (
              <Col key={item.id}>
                <Card>
                  <Card.Img
                    className=""
                    variant=""
                    src={item.pictureUrl}
                    onClick={() => handleCarClick(item.id)}
                    style={{ cursor: "pointer", height: "264px" }}
                  />
                  <Card.Title>{item.name}</Card.Title>
                </Card>
              </Col>
            ))}
 */

/**
    return (
    <>
      <Container>
        <div className={styles.scrollableRow}>
          <Row>
            {items.map((item) => (
              <Col key={item.id}>
                <Card.Img
                  className=""
                  variant=""
                  src={item.pictureUrl}
                  onClick={() => handleCarClick(item.id)}
                  style={{
                    cursor: "pointer",
                    height: "264px",
                    width: "220px",
                  }}
                />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </>
  );
 */
