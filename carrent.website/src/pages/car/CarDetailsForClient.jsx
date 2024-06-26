import { useState, useMemo } from "react";
import { Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import TechDetailCard from "../../components/Cars/TechDetailCard";
import BookCar from "../../components/Cars/BookCar";
import Pricelist from "../../components/Cars/Pricelist";
import CarOpinionList from "../../components/Cars/CarOpinionList";
import AdditionalImgModal from "../../components/Modal/AdditionalImgModal";
import { useGetCarDetailsQuery } from "../../api/carsApi";

function CarDetailsForClient() {
  const param = useParams();
  const { data: car, error, isLoading } = useGetCarDetailsQuery(param.carId);
  const [modalShow, setModalShow] = useState(false);

  const openAdditionalImg = () => {
    setModalShow(true);
  };

  const defaultImageUrl =
    "https://cdn.pixabay.com/photo/2012/11/02/13/02/car-63930_960_720.jpg%201x,%20https://cdn.pixabay.com/photo/2012/11/02/13/02/car-63930_1280.jpg";

  const carImages = useMemo(() => {
    return car ? [car.pictureUrl, ...car.carImages.map((it) => it.imgUrl)] : [];
  }, [car]);

  if (isLoading) {
    return <>loading</>;
  }

  if (error) {
    return <>Error loading car details</>;
  }

  if (!car) {
    return <>Car not found.</>;
  }

  const imageUrl = car.pictureUrl || defaultImageUrl;

  return (
    <>
      <AdditionalImgModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        imgs={carImages}
      />
      <Container className="mt-5 mb-5">
        <Row>
          <Col lg={8}>
            <Row>
              <h2>{car.name}</h2>
            </Row>
            <Row>
              <Image
                className="roundedImg"
                src={imageUrl}
                onClick={openAdditionalImg}
              />
            </Row>
            <Row className="mt-2">
              <Row>
                <h3>Technicalities</h3>
              </Row>
              <Row>
                <Col>
                  <TechDetailCard
                    title={car.ac}
                    subtitle={"Air conditioning"}
                    icon={"fa-solid fa-c"}
                  />
                </Col>
                <Col>
                  <TechDetailCard
                    title={car.engine}
                    subtitle={"Engine"}
                    icon={"fa-solid fa-gear"}
                  />
                </Col>
                <Col>
                  <TechDetailCard
                    title={car.gearbox}
                    subtitle={"Gearbox"}
                    icon={"fa-solid fa-gears"}
                  />
                </Col>
              </Row>
            </Row>
            <Row className="mt-2">
              <Row>
                <h3>Description</h3>
              </Row>
              <Row>
                <p>{car.description}</p>
              </Row>
            </Row>
            <Row>
              <h5>Car equipment</h5>
              <ListGroup className="p-2 mb-2">
                {car.carEquipment &&
                  car.carEquipment.length > 0 &&
                  car.carEquipment.map((it) => (
                    <ListGroup.Item key={it.id}>{it.name}</ListGroup.Item>
                  ))}
              </ListGroup>
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
