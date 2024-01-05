import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import jwtInterceptor from "../../utils/jwtInterceptor";

function CarDetails() {
  const initialState = {
    name: "",
    carMakeId: 0,
    carModel: "",
    description: "",
    carImage: "",
    carMileage: 0,
    horsepower: "",
    acceleration0to100: 0,
    numberOfSeats: 5,
    numberOfDoors: 5,
    yearOfProduction: 0,
    overlimitFee: 0,
    averageCombustion: 0,
    trunkCapacity: 0,
    carTypeId: 0,
    engineTypeId: 0,
    kilometrLimitId: 0,
    airConditioningTypeId: 0,
    gearBoxTypeId: 0,
    carDriveId: 0,
  };
  const [car, setCar] = useState(initialState);
  const [carInfo, setCarInfo] = useState();
  const param = useParams();

  useEffect(() => {
    fetchCarInfo();
    fetchCar();
  }, []);

  const fetchCarInfo = () => {
    jwtInterceptor
      .get("car/AllInfoForCar")
      .then((data) => {
        setCarInfo(data.data);
        //setLoading(false);
      })
      .catch((error) => {
        console.log("error fetching the makes: ", error);
        //setError(error);
        //setLoading(false);
      });
  };

  const fetchCar = () => {
    jwtInterceptor
      .get(`car/${param.carId}`)
      .then((data) => {
        console.log(data);
        setCar(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCar((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateCar = () => {
    jwtInterceptor
      .put(`car/edit/${param.carId}`, JSON.stringify(car), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        console.log("car updated");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateCar();
  };

  if (!carInfo) {
    return <p>Loading ...</p>;
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <p>Car details for {param.carId}</p>
          </Col>
          <Col>
            <Nav.Link as={NavLink} to={`pricelist`}>
              Cennik
            </Nav.Link>
          </Col>
          <Col>
            <Nav.Link as={NavLink} to={`/car/${param.carId}/calendar`}>
              Kalendarz
            </Nav.Link>
          </Col>
        </Row>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Car</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Name</label>
                        <Form.Control
                          name="name"
                          type="text"
                          value={car.name}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Make</label>
                        <Form.Control
                          as="select"
                          name="carMake"
                          value={car.carMakeId}
                          onChange={handleChange}
                        >
                          {carInfo.carMakes.map((make) => (
                            <option key={make.id} value={make.id}>
                              {make.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Model</label>
                        <Form.Control
                          type="text"
                          name="carModel"
                          value={car.carModel}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Year Of Production</label>
                        <Form.Control
                          type="number"
                          name="yearOfProduction"
                          value={car.yearOfProduction}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Car Drive</label>
                        <Form.Control
                          as="select"
                          name="carDriveId"
                          value={car.carDriveId}
                          onChange={handleChange}
                        >
                          {carInfo.carDrive.map((drive) => (
                            <option key={drive.id} value={drive.id}>
                              {drive.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Car Type</label>
                        <Form.Control
                          as="select"
                          name="carTypeId"
                          value={car.carTypeId}
                          onChange={handleChange}
                        >
                          {carInfo.carType.map((type) => (
                            <option key={type.id} value={type.id}>
                              {type.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Engine Type </label>
                        <Form.Control
                          as="select"
                          name="engineTypeId"
                          value={car.engineTypeId}
                          onChange={handleChange}
                        >
                          {carInfo.engineType.map((type) => (
                            <option key={type.id} value={type.id}>
                              {type.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Gearbox Type</label>
                        <Form.Control
                          as="select"
                          name="gearBoxTypeId"
                          value={car.gearBoxTypeId}
                          onChange={handleChange}
                        >
                          {carInfo.gearboxType.map((type) => (
                            <option key={type.id} value={type.id}>
                              {type.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Air Condition</label>
                        <Form.Control
                          as="select"
                          name="airConditioningTypeId"
                          value={car.airConditioningTypeId}
                          onChange={handleChange}
                        >
                          {carInfo.airConditioningType.map((type) => (
                            <option key={type.id} value={type.id}>
                              {type.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Kilometr Limit </label>
                        <Form.Control
                          as="select"
                          name="kilometrLimitId"
                          value={car.kilometrLimitId}
                          onChange={handleChange}
                        >
                          {carInfo.kilometrLimit.map((type) => (
                            <option key={type.id} value={type.id}>
                              {type.limitValue}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Number Of Doors </label>
                        <Form.Control
                          type="number"
                          name="numberOfDoors"
                          value={car.numberOfDoors}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Number Of Seats</label>
                        <Form.Control
                          type="number"
                          name="numberOfSeats"
                          value={car.numberOfSeats}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Number Of Mileage </label>
                        <Form.Control
                          type="number"
                          name="carMileage"
                          value={car.carMileage}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Horsepower </label>
                        <Form.Control
                          type="number"
                          name="horsepower"
                          value={car.horsepower}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>0 to 100 Acceleration </label>
                        <Form.Control
                          type="number"
                          name="acceleration0to100"
                          value={car.acceleration0to100}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Average Combustion</label>
                        <Form.Control
                          type="number"
                          name="averageCombustion"
                          value={car.averageCombustion}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>TrunkCapacity </label>
                        <Form.Control
                          type="number"
                          name="trunkCapacity"
                          value={car.trunkCapacity}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>OverlimitFee </label>
                        <Form.Control
                          type="number"
                          name="overlimitFee"
                          value={car.overlimitFee}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Description</label>
                        <Form.Control
                          as="textarea"
                          cols="80"
                          rows="5"
                          name="description"
                          value={car.description}
                          onChange={handleChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Aktualizuj
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image h-100">
                <Image src={car.carImage} />
              </div>
              <Card.Body>
                <p className="description text-center mt-2">
                  {car.description}
                </p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CarDetails;

/*
const setCarImage = (path) => {
    setCar((prevState) => ({
      ...prevState,
      CarImage: path,
    }));
  };

  const handleImage = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    fetchData("https://localhost:7091/car/uploadCarImage", {
      method: "POST",
      body: formData,
    })
      .then((data) => {
        setCarImage(data.path);
      })
      .catch((error) => {
        console.log("error fetching the makes: ", error);
      });
  }; 
  */
