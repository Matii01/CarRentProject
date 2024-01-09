import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import TechDetailCard from "../../components/Cars/TechDetailCard";
import BookCar from "../../components/Cars/BookCar";
import Pricelist from "../../components/Cars/Pricelist";
import CarOpinionList from "../../components/Cars/CarOpinionList";

function CarDetailsForClient() {
  const [car, setCar] = useState({});
  const param = useParams();
  const navigation = useNavigate();

  useEffect(() => {
    //details/{id:int}
    axios
      .get(`https://localhost:7091/Car/details/${param.carId}`)
      .then((data) => {
        console.log(data);
        setCar(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [param.carId]);

  let url = car.pictureUrl;
  if (car.pictureUrl === "") {
    url =
      "https://cdn.pixabay.com/photo/2012/11/02/13/02/car-63930_960_720.jpg%201x,%20https://cdn.pixabay.com/photo/2012/11/02/13/02/car-63930_1280.jpg";
  }

  return (
    <>
      <Container className="mt-5 mb-5">
        <Row>
          <Col lg={8}>
            <Row>
              <h2>{car.name}</h2>
            </Row>
            <Row>
              <Image className="roundedImg" src={url} />
            </Row>
            <Row className="mt-2">
              <Row>
                <h3>Dane Technicze</h3>
              </Row>
              <Row>
                <Col>
                  <TechDetailCard
                    title={car.ac}
                    subtitle={"klimatyzacja"}
                    icon={"fa-solid fa-c"}
                  />
                </Col>
                <Col>
                  <TechDetailCard
                    title={car.engine}
                    subtitle={"silnik"}
                    icon={"fa-solid fa-gear"}
                  />
                </Col>
                <Col>
                  <TechDetailCard
                    title={car.gearbox}
                    subtitle={"skrzynia biegów"}
                    icon={"fa-solid fa-gears"}
                  />
                </Col>
              </Row>
            </Row>
            <Row className="mt-2">
              <Row>
                <h3>Opis</h3>
              </Row>
              <Row>
                <p>{car.description}</p>
              </Row>
            </Row>
            <Row>
              <Col>
                <Pricelist id={param.carId} />
              </Col>
            </Row>
          </Col>
          <Col>
            <BookCar carId={param.carId} excludedDates={car.excludedDates} />
          </Col>
        </Row>
        <Row className="mt-2">
          <hr />
          <CarOpinionList carid={param.carId} />
        </Row>
      </Container>
    </>
  );
}

export default CarDetailsForClient;
