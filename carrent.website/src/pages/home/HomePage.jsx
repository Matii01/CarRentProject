import { Col, Container, Image, Row } from "react-bootstrap";
import style from "./HomePage.module.css";
import RecommendedCars from "../../components/Cars/RecommendedCars";

function HomePage() {
  return (
    <>
      <Container className="p-0 m-0 ">
        <Row>
          <Col className="p-0 m-0" style={{ width: "100vw" }}>
            <Image src="imgs/car-login.jpg" style={{ width: "100vw" }} />
            <div className={`${style.textOverlay}`}>
              Welcome to - Your Ultimate Car Rental Solution!
            </div>
          </Col>
        </Row>
        <Row
          className="d-flex justify-content-center"
          style={{ width: "100vw" }}
        >
          <RecommendedCars />
        </Row>
      </Container>
    </>
  );
}
//<Image src="imgs/car-login.jpg" style={{ width: "100vw" }} />

export default HomePage;
