import { useEffect, useState } from "react";
import {
  Col,
  Container,
  Form,
  Row,
  Button,
  FormGroup,
  FormControl,
} from "react-bootstrap";
import "./AddNewCar.css";
import { useNavigate, useParams } from "react-router-dom";

function UpdateCar() {
  const params = useParams();
  console.log(params);

  const [car, setCar] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [makes, setMakes] = useState([]);

  useEffect(() => {
    fetchCarInfo();
    fetchCar();
  }, []);

  const fetchCar = () => {
    fetch(`https://localhost:7091/car/${params.carId}`)
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error("Car was not found");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCar(data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const fetchCarInfo = () => {
    fetch("https://localhost:7091/car/AllInfoForCar")
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setMakes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error fetching the makes: ", error);
        setError(error);
        setLoading(false);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCar((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const setCarImage = (path) => {
    setCar((prevState) => ({
      ...prevState,
      CarImage: path,
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

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`https://localhost:7091/car/edit/${params.carId}`, {
      method: "PUT",
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
        //return response.json();
      })
      .then(() => {
        navigate("/cars");
      })
      .catch((error) => {
        console.log("", error);
      });
  };

  if (loading) {
    return <p>Loading makes...</p>;
  }

  if (error) {
    return <p>Error fetchong makes: {error.message}</p>;
  }

  const rowClasses = "mt-3";

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row className={rowClasses}>
          <Col xs={12} sm={6}>
            <Form.Group controlId="carName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter car name"
                name="name"
                required
                value={car.name}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={6} className="custom-mt-xs">
            <Form.Group controlId="carModel">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter car model"
                name="CarModel"
                value={car.carModel}
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
                name="carMake"
                required
                value={car.carMake}
                onChange={handleChange}
                placeholder="select ... "
                defaultValue={car.carMakeId}
              >
                {makes.carMakes.map((make) => (
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
                name="yearOfProduction"
                value={car.yearOfProduction}
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
                name="carDriveId"
                value={car.carDriveId}
                onChange={handleChange}
                defaultValue={car.carDriveId}
              >
                {makes.carDrive.map((drive) => (
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
                value={car.carTypeId}
                onChange={handleChange}
                defaultValue={car.carTypeId}
              >
                {makes.carType.map((type) => (
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
                name="engineTypeId"
                value={car.engineTypeId}
                onChange={handleChange}
                defaultValue={car.engineTypeId}
              >
                {makes.engineType.map((type) => (
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
                value={car.gearBoxTypeId}
                onChange={handleChange}
                defaultValue={car.GearBoxTypeId}
              >
                {makes.gearboxType.map((type) => (
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
                name="airConditioningTypeId"
                value={car.airConditioningTypeId}
                onChange={handleChange}
                defaultValue={car.airConditioningTypeId}
              >
                {makes.airConditioningType.map((type) => (
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
                name="kilometrLimitId"
                value={car.kilometrLimitId}
                onChange={handleChange}
              >
                {makes.kilometrLimit.map((type) => (
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
                name="numberOfDoors"
                value={car.numberOfDoors}
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
                name="numberOfSeats"
                value={car.numberOfSeats}
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
                name="carMileage"
                value={car.carMileage}
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
                name="horsepower"
                value={car.horsepower}
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
                name="acceleration0to100"
                value={car.acceleration0to100}
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
                name="averageCombustion"
                value={car.averageCombustion}
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
                name="trunkCapacity"
                value={car.trunkCapacity}
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
                name="overlimitFee"
                value={car.overlimitFee}
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
                name="description"
                value={car.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className={rowClasses}>
          <Col>
            <FormGroup controlId="carImage">
              <Form.Label>Car Image</Form.Label>
              <FormControl
                type="file"
                name="CarImage"
                onChange={handleImage}
              ></FormControl>
            </FormGroup>
          </Col>
        </Row>
        <Row className={`${rowClasses} mb-5`}>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Row>
      </Form>
    </Container>
  );
}

export default UpdateCar;
