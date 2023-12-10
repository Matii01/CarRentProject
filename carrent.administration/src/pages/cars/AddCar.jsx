import { useNavigate } from "react-router";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import fetchData from "./../../functions/fetchData";

const initialState = {
  Name: "",
  CarMakeId: 0,
  CarModel: "",
  Description: "",
  CarImage: "",
  CarMileage: 0,
  Horsepower: "",
  Acceleration0to100: 0,
  NumberOfSeats: 5,
  NumberOfDoors: 5,
  YearOfProduction: 0,
  OverlimitFee: 0,
  AverageCombustion: 0,
  TrunkCapacity: 0,
  CarTypeId: 0,
  EngineTypeId: 0,
  KilometrLimitId: 0,
  AirConditioningTypeId: 0,
  GearBoxTypeId: 0,
  CarDriveId: 0,
};

function AddCar() {
  const navigate = useNavigate();
  const [car, setCar] = useState({ ...initialState });
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchData("https://localhost:7091/car/AllInfoForCar")
      .then((data) => {
        console.log(data);
        setCarData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("add new car");
    fetch("https://localhost:7091/car/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        setCar(initialState);
        navigate("/cars");
      })
      .catch((error) => {
        console.log("", error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCar((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImage = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    fetch("https://localhost:7091/car/uploadCarImage", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCarImage(data.path);
      })
      .catch((error) => {
        console.log("error fetching the makes: ", error);
      });
  };

  const setCarImage = (path) => {
    console.log(path);
    setCar((prevState) => ({
      ...prevState,
      CarImage: path,
    }));
  };

  if (loading) {
    return <p>Loading ... </p>;
  }
  if (error) {
    return <p>error</p>;
  }

  const rowClasses = "mt-3";
  return (
    <Container fluid>
      <Row>
        <Col>
          <Card className="ps-5 pe-5">
            <Card.Header>
              <Card.Title as="h4">Add Car</Card.Title>
            </Card.Header>
            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit}>
                <Row className={rowClasses}>
                  <Col xs={12} sm={6}>
                    <Form.Group controlId="carName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        className="border border-dark"
                        type="text"
                        placeholder="Enter car name"
                        name="Name"
                        required
                        value={car.Name}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6} className="custom-mt-xs">
                    <Form.Group controlId="carModel">
                      <Form.Label>Model</Form.Label>
                      <Form.Control
                        className="border border-dark"
                        type="text"
                        placeholder="Enter car model"
                        name="CarModel"
                        value={car.CarModel}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className={rowClasses}>
                  <Col xs={12} sm={6}>
                    <Form.Group controlId="carMake">
                      <Form.Label>Make</Form.Label>
                      <Form.Control
                        as="select"
                        name="CarMakeId"
                        required
                        value={car.CarMakeId}
                        onChange={handleChange}
                        placeholder="select ... "
                      >
                        <option></option>
                        {carData.carMakes.map((make) => (
                          <option key={make.id} value={make.id}>
                            {make.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6} className="custom-mt-xs">
                    <Form.Group controlId="yearOfProduction">
                      <Form.Label>Year Of Production</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter year of production"
                        name="YearOfProduction"
                        value={car.YearOfProduction}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className={rowClasses}>
                  <Col xs={12} sm={6}>
                    <Form.Group controlId="carDrive">
                      <Form.Label>Car Drive</Form.Label>
                      <Form.Control
                        as="select"
                        name="CarDriveId"
                        value={car.CarDriveId}
                        onChange={handleChange}
                      >
                        <option></option>

                        {carData.carDrive.map((drive) => (
                          <option key={drive.id} value={drive.id}>
                            {drive.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6} className="custom-mt-xs">
                    <Form.Group controlId="carType">
                      <Form.Label>Car Type</Form.Label>
                      <Form.Control
                        as="select"
                        name="CarTypeId"
                        value={car.CarTypeId}
                        onChange={handleChange}
                      >
                        <option></option>
                        {carData.carType.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className={rowClasses}>
                  <Col xs={12} sm={6}>
                    <Form.Group controlId="engineType">
                      <Form.Label>Engine Type</Form.Label>
                      <Form.Control
                        as="select"
                        name="EngineTypeId"
                        value={car.EngineTypeId}
                        onChange={handleChange}
                      >
                        <option></option>
                        {carData.engineType.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6} className="custom-mt-xs">
                    <Form.Group controlId="gearboxType">
                      <Form.Label>Gearbox Type</Form.Label>
                      <Form.Control
                        as="select"
                        name="GearBoxTypeId"
                        value={car.GearBoxTypeId}
                        onChange={handleChange}
                      >
                        <option></option>
                        {carData.gearboxType.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className={rowClasses}>
                  <Col xs={12} sm={6}>
                    <Form.Group controlId="airCondition">
                      <Form.Label>Air Condition</Form.Label>
                      <Form.Control
                        as="select"
                        name="AirConditioningTypeId"
                        value={car.AirConditioningTypeId}
                        onChange={handleChange}
                      >
                        <option></option>
                        {carData.airConditioningType.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6} className="custom-mt-xs">
                    <Form.Group controlId="kilometrLimit">
                      <Form.Label>Kilometr Limit</Form.Label>
                      <Form.Control
                        as="select"
                        name="KilometrLimitId"
                        value={car.KilometrLimitId}
                        onChange={handleChange}
                      >
                        <option></option>
                        {carData.kilometrLimit.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.limitValue}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className={rowClasses}>
                  <Col xs={12} sm={6}>
                    <Form.Group controlId="numberOfDoors">
                      <Form.Label>Number Of Doors</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter doors number"
                        name="NumberOfDoors"
                        value={car.NumberOfDoors}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6} className="custom-mt-xs">
                    <Form.Group controlId="numberOfSeats">
                      <Form.Label>Number Of Seats</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter seats number"
                        name="NumberOfSeats"
                        value={car.NumberOfSeats}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className={rowClasses}>
                  <Col xs={12} sm={6}>
                    <Form.Group controlId="carMileage">
                      <Form.Label>Number Of Mileage</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter car millage"
                        name="CarMileage"
                        value={car.CarMileage}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6} className="custom-mt-xs">
                    <Form.Group controlId="horsepower">
                      <Form.Label>Number of Horsepower</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter horsepower"
                        name="Horsepower"
                        value={car.Horsepower}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className={rowClasses}>
                  <Col xs={12} sm={6}>
                    <Form.Group controlId="acceleration0to100">
                      <Form.Label> 0 to 100 Acceleration</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Acceleration"
                        name="Acceleration0to100"
                        value={car.Acceleration0to100}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6} className="custom-mt-xs">
                    <Form.Group controlId="averageCombustion">
                      <Form.Label> Average Combustion</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="AverageCombustion"
                        name="AverageCombustion"
                        value={car.AverageCombustion}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className={rowClasses}>
                  <Col xs={12} sm={6}>
                    <Form.Group controlId="trunkCapacity">
                      <Form.Label> TrunkCapacity</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="TrunkCapacity"
                        name="TrunkCapacity"
                        value={car.TrunkCapacity}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6} className="custom-mt-xs">
                    <Form.Group controlId="overlimitFee">
                      <Form.Label> OverlimitFee</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="OverlimitFee"
                        name="OverlimitFee"
                        value={car.OverlimitFee}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className={rowClasses}>
                  <Col>
                    <Form.Group controlId="Description">
                      <Form.Label> Description</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="description"
                        name="Description"
                        value={car.Description}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className={rowClasses}>
                  <Col>
                    <Form.Group controlId="carImage">
                      <Form.Label>Car Image</Form.Label>
                      <Form.Control
                        type="file"
                        name="CarImage"
                        onChange={handleImage}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className={`${rowClasses} mb-5`}>
                  <Button variant="primary" type="submit">
                    Create new car
                  </Button>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AddCar;
