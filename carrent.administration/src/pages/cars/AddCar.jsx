import { useNavigate } from "react-router";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { storage } from "./../../hooks/useFirebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import jwtInterceptor from "../../utils/jwtInterceptor";
import { useSelector } from "react-redux";

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
  CarImages: [],
};

function AddCar() {
  const navigate = useNavigate();
  const [car, setCar] = useState({ ...initialState });
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [additionalImg, setAdditionalImg] = useState([]);
  const roles = useSelector((state) => state.user.role);

  useEffect(() => {
    jwtInterceptor
      .get(`car/AllInfoForCar`)
      .then((data) => {
        console.log(data);
        setCarData(data.data);
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

    jwtInterceptor
      .post("car/create", JSON.stringify(car), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        setCar(initialState);
        navigate(`/car/details/${data.data.id}`);
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

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `${v4() + imageUpload.name}`);

    uploadBytes(imageRef, imageUpload).then((response) => {
      getDownloadURL(response.ref).then((url) => {
        console.log(url);
        setCarImage(url);
      });
    });
  };

  const uploadAdditionalImag = (img) => {
    if (img == null) return;
    const imageRef = ref(storage, `${v4() + img.name}`);

    uploadBytes(imageRef, img).then((response) => {
      getDownloadURL(response.ref).then((url) => {
        const newArr = [...additionalImg, { name: img.name, url: url }];
        const newArrForCar = [...car.CarImages, url];

        setCar((prev) => ({
          ...prev,
          CarImages: newArrForCar,
        }));
        setAdditionalImg(newArr);
      });
    });
  };

  const removeFromAdditionalImgsList = (name) => {
    const newArr = additionalImg.filter((it) => it.name != name);
    setAdditionalImg(newArr);
  };

  const handleFirebaseImage = (event) => {
    setImageUpload(event.target.files[0]);
  };

  const handleAdditionalImages = (event) => {
    const name = event.target.files[0].name;
    uploadAdditionalImag(event.target.files[0]);
  };

  useEffect(() => {
    uploadImage();
  }, [imageUpload]);

  const setCarImage = (path) => {
    setCar((prevState) => ({
      ...prevState,
      CarImage: path,
    }));
  };

  if (!(roles.includes("Administrator") || roles.includes("CarAdd"))) {
    return <p>Brak uprawnień</p>;
  }

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
              <Card.Title as="h4">Dodaj Samochód</Card.Title>
            </Card.Header>
            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit}>
                <Row className={rowClasses}>
                  <Col xs={12} sm={6}>
                    <Form.Group controlId="carName">
                      <Form.Label>Nazwa</Form.Label>
                      <Form.Control
                        className="border border-dark"
                        type="text"
                        placeholder="Nazwa"
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
                        placeholder="Model"
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
                      <Form.Label>Marka</Form.Label>
                      <Form.Control
                        required
                        as="select"
                        name="CarMakeId"
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
                      <Form.Label>Rok produkcji</Form.Label>
                      <Form.Control
                        type="number"
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
                      <Form.Label>Napęd na</Form.Label>
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
                      <Form.Label>Typ nadwozia</Form.Label>
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
                      <Form.Label>Silnik</Form.Label>
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
                      <Form.Label>Skrzynia biegów</Form.Label>
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
                      <Form.Label>Klimatyzacja</Form.Label>
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
                      <Form.Label>Limit kilometrów</Form.Label>
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
                      <Form.Label>Liczba drzwi</Form.Label>
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
                      <Form.Label>Liczba miejsc</Form.Label>
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
                      <Form.Label>Przebieg</Form.Label>
                      <Form.Control
                        type="number"
                        name="CarMileage"
                        value={car.CarMileage}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6} className="custom-mt-xs">
                    <Form.Group controlId="horsepower">
                      <Form.Label>Moc (KM)</Form.Label>
                      <Form.Control
                        type="number"
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
                      <Form.Label>Przyspieszenie (0 - 100)</Form.Label>
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
                      <Form.Label>Średnie spalanie</Form.Label>
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
                      <Form.Label>Wielkość bagażnika</Form.Label>
                      <Form.Control
                        type="number"
                        name="TrunkCapacity"
                        value={car.TrunkCapacity}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={6} className="custom-mt-xs">
                    <Form.Group controlId="overlimitFee">
                      <Form.Label>Opłata za przekroczenie limitu</Form.Label>
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
                      <Form.Label>Opis</Form.Label>
                      <Form.Control
                        as={"textarea"}
                        type="text"
                        placeholder="Opis"
                        name="Description"
                        value={car.Description}
                        onChange={handleChange}
                        style={{ height: 100 }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className={rowClasses}>
                  <Col>
                    <Form.Group controlId="carImage">
                      <Form.Label>Zdjęcie główne</Form.Label>
                      <Form.Control
                        type="file"
                        name="CarImage"
                        onChange={handleFirebaseImage}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Form.Group>
                    <Form.Label>Dodatkowe zdjęcia</Form.Label>
                    <Form.Control
                      type="file"
                      name="CarImage"
                      onChange={handleAdditionalImages}
                    ></Form.Control>
                  </Form.Group>
                </Row>
                <Row className="mt-2">
                  <ListGroup>
                    {additionalImg.map((it, index) => (
                      <ListGroup.Item
                        key={index}
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold"></div>
                          {it.name}
                        </div>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeFromAdditionalImgsList(it.name)}
                        >
                          usuń
                        </Button>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Row>

                <Row className={`${rowClasses} mb-5`}>
                  <Col className="w-100">
                    <Button
                      className="w-100 p-2 mt-2"
                      variant="dark"
                      size="sm"
                      type="submit"
                    >
                      Dodaj nowy
                    </Button>
                  </Col>
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
