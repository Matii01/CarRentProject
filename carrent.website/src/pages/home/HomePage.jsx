import { Col, Container, Image, Row } from "react-bootstrap";
import style from "./HomePage.module.css";
import RecommendedCars from "../../components/Cars/RecommendedCars";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosConfig";

function HomePage() {
  const [page, setPage] = useState({
    homePageImage: "",
    homePageTextOne: "",
    homePageTextTwo: "",
    homePageTitle: "",
  });

  useEffect(() => {
    axiosInstance
      .get(`ContentManagement/homePage`)
      .then((data) => {
        setPage(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Container className="p-0 m-0 ">
        <Row>
          <Col className="p-0 m-0" style={{ width: "100vw" }}>
            <Image src="imgs/car-login.jpg" style={{ width: "100vw" }} />
            <div className={`${style.textOverlay}`}>
              <h2>Welcome to - Your Ultimate Car Rental Solution!</h2>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="justify-content-center text-center m-5">
            <h2>{page.homePageTitle} </h2>
          </Col>
        </Row>
        <Row
          className="d-flex justify-content-center"
          style={{ width: "100vw" }}
        >
          <Container style={{ width: "90%" }}>
            <Row>
              <Col className="m-5">{page.homePageTextOne}</Col>
              <Col className="m-5">{page.homePageTextTwo}</Col>
            </Row>
          </Container>
        </Row>
        <Row
          id="recommended"
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
