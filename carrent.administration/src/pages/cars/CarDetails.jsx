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
  ListGroup,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { storage } from "./../../hooks/useFirebase";
import jwtInterceptor from "../../utils/jwtInterceptor";
import { ToastContainer, toast } from "react-toastify";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useSelector } from "react-redux";

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
    carImages: [],
  };
  const [isLoading, setIsLoading] = useState({
    car: true,
    carInfo: true,
    carRecommended: true,
  });
  const [car, setCar] = useState({});
  const [carInfo, setCarInfo] = useState();
  const [isRecommended, setIsRecommended] = useState(false);
  const param = useParams();
  const roles = useSelector((state) => state.user.role);

  useEffect(() => {
    fetchCarInfo();
    fetchCar();
    isInRecommended();
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
      })
      .finally(() => {
        setIsLoading((prev) => ({
          ...prev,
          carInfo: false,
        }));
      });
  };

  const fetchCar = () => {
    jwtInterceptor
      .get(`car/${param.carId}`)
      .then((data) => {
        setCar(data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading((prev) => ({
          ...prev,
          car: false,
        }));
      });
  };

  const isInRecommended = () => {
    jwtInterceptor
      .get(`car/isRecommended/${param.carId}`)
      .then((data) => {
        setIsRecommended(data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading((prev) => ({
          ...prev,
          carRecommended: false,
        }));
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
    const { id, carImages, ...toSend } = car;
    console.log(toSend);
    jwtInterceptor
      .put(`car/edit/${param.carId}`, JSON.stringify(toSend), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        toast.success("Zapisano zmiany");
      })
      .catch((error) => {
        toast.error("błąd");
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateCar();
  };

  const addToRecommended = () => {
    jwtInterceptor
      .post(`car/addRecommended/${param.carId}`)
      .then((data) => {
        setIsRecommended(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeFromRecommended = () => {
    jwtInterceptor
      .post(`car/removeRecommended/${param.carId}`)
      .then((data) => {
        setIsRecommended(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SetCarAsVisible = () => {
    ToggleVisibility(true);
  };
  const SetCarAsHide = () => {
    ToggleVisibility(false);
  };

  const ToggleVisibility = (value) => {
    jwtInterceptor
      .post(`car/setVisibility/${param.carId}`, JSON.stringify(value), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        SetCarVisibility(value);
        toast.success("Zapisano zmiany");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  };

  const SetCarVisibility = (value) => {
    setCar((prev) => ({
      ...prev,
      isVisible: value,
    }));
  };

  const getCarImages = () => {
    jwtInterceptor
      .get(`car/carImages/${param.carId}`)
      .then((data) => {
        console.log(data.data);
        setCar((prev) => ({ ...prev, carImages: data.data }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteCarImg = (id) => {
    jwtInterceptor
      .delete(`car/deleteImg/${id}`)
      .then((data) => {
        const newArr = car.carImages.filter((it) => it.id != id);
        setCar((prev) => ({ ...prev, carImages: newArr }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAdditionalImages = (event) => {
    const name = event.target.files[0].name;
    uploadAdditionalImag(event.target.files[0]);
  };

  const addNewCarImage = (url) => {
    jwtInterceptor
      .post(
        `car/addCarImg`,
        JSON.stringify({ Id: 0, CarId: param.carId, ImgUrl: url }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        getCarImages();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const uploadAdditionalImag = (img) => {
    if (img == null) return;
    const imageRef = ref(storage, `${v4() + img.name}`);

    uploadBytes(imageRef, img).then((response) => {
      getDownloadURL(response.ref).then((url) => {
        addNewCarImage(url);
      });
    });
  };

  const handleFirebaseImage = (event) => {
    //setImageUpload(event.target.files[0]);
    const imageUpload = event.target.files[0];
    if (imageUpload == null) return;
    const imageRef = ref(storage, `${v4() + imageUpload.name}`);

    uploadBytes(imageRef, imageUpload).then((response) => {
      getDownloadURL(response.ref).then((url) => {
        console.log(url);
        setCar((prev) => ({
          ...prev,
          carImage: url,
        }));
      });
    });
  };

  if (!(roles.includes("Administrator") || roles.includes("CarEditor"))) {
    return <p>Brak uprawnień</p>;
  }

  if (!carInfo || !car) {
    return <p>Loading ...</p>;
  }

  if (isLoading.car || isLoading.carInfo || isLoading.carRecommended) {
    return <p>Loading ...</p>;
  }

  return (
    <>
      <ToastContainer />
      <Container fluid>
        <hr />
        <Row className="ps-2">
          <Col>
            <p>Szczegóły {param.carId}</p>
          </Col>
          <Col>
            <Nav.Link as={NavLink} to={`/car/${param.carId}/equipment`}>
              Wyposażenie
            </Nav.Link>
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
          <Col>
            <Nav.Link as={NavLink} to={`/car/${param.carId}/carRabat`}>
              Rabaty
            </Nav.Link>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Row>
                  <Col>
                    <Card.Title as="h4">Edycja</Card.Title>
                  </Col>

                  <Col className="d-flex justify-content-end">
                    {!car.isVisible && (
                      <Button
                        variant="dark"
                        size="sm"
                        onClick={SetCarAsVisible}
                      >
                        Ustaw jako widoczny
                      </Button>
                    )}
                    {car.isVisible && (
                      <Button variant="dark" size="sm" onClick={SetCarAsHide}>
                        Ustaw jako ukryty
                      </Button>
                    )}
                  </Col>
                  <Col className="d-flex justify-content-end">
                    {!isRecommended && (
                      <Button
                        variant="dark"
                        size="sm"
                        onClick={addToRecommended}
                      >
                        Dodaj do polecanych
                      </Button>
                    )}
                    {isRecommended && (
                      <Button
                        variant="dark"
                        size="sm"
                        onClick={removeFromRecommended}
                      >
                        Usuń z polecanych
                      </Button>
                    )}
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>Nazwa</label>
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
                        <label>Marka</label>
                        <Form.Control
                          as="select"
                          name="carMakeId"
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
                        <label>Rok produkcji</label>
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
                        <label>Napęd na</label>
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
                        <label>Typ nadwozia</label>
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
                        <label>Silnik</label>
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
                        <label>Skrzynia biegów</label>
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
                        <label>Klimatyzacja</label>
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
                        <label>Limit kilometrów</label>
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
                        <label>Liczba drzwi</label>
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
                        <label>Miejsca</label>
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
                        <label>Przebieg</label>
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
                        <label>Moc (KM)</label>
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
                        <label>Przyspieszenie 0 - 100</label>
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
                        <label>Średnie spalanie</label>
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
                        <label>Bagażnik</label>
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
                        <label>Za przekroczenie</label>
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
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Opis</label>
                        <Form.Control
                          as="textarea"
                          name="description"
                          value={car.description}
                          onChange={handleChange}
                          style={{ height: 150 }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="dark"
                  >
                    Aktualizuj
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Row>
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
            </Row>
          </Col>
        </Row>
        <Row>
          <Row>
            <Card>
              <Card.Header>Dodatkowe zdjęcia</Card.Header>
              <Card.Body>
                <Row className="mt-2">
                  {car.carImages.map((it) => (
                    <Col key={it.id}>
                      <Card style={{ width: "15rem" }}>
                        <Image src={it.imgUrl} />
                        <Card.Footer>
                          <Button
                            className="w-100 mt-2"
                            variant="danger"
                            size="sm"
                            onClick={() => deleteCarImg(it.id)}
                          >
                            Usuń
                          </Button>
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))}
                </Row>
                <Row>
                  <Form.Group>
                    <Form.Label>Dodaj kolejne</Form.Label>
                    <Form.Control
                      type="file"
                      name="CarImage"
                      onChange={handleAdditionalImages}
                    ></Form.Control>
                  </Form.Group>
                </Row>
              </Card.Body>
            </Card>
          </Row>
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
