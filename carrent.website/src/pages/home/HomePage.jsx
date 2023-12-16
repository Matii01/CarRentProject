import { Col, Container, Image, Row } from "react-bootstrap";
import style from "./HomePage.module.css";

function HomePage() {
  return (
    <>
      <Container className="p-0 m-0">
        <Row>
          <Col className="p-0 m-0" style={{ width: "100vw" }}>
            <Image src="imgs/car-login.jpg" style={{ width: "100vw" }} />
            <div className={`${style.textOverlay}`}></div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomePage;
