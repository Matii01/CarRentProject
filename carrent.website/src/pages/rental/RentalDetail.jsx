import axios from "axios";
import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axiosInstance from "./../../utils/axiosConfig";

function RentalDetail() {
  const param = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams("");
  const [isLoading, setIsLoading] = useState(false);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const [allRentalData, setAllRentalData] = useState({
    NewRentalForClient: {
      CarId: param.carId,
      DateFrom: from,
      DateTo: to,
    },
    ClientDetails: {
      FirstName: "",
      LastName: "",
      Email: "",
      PhoneNumber: "",
      Address: "",
      PostCode: "",
      City: "",
    },
    Invoice: {
      Number: "zxcvbnm",
      Comment: "brak uwag",
    },
  });

  const addRental = (event) => {
    event.preventDefault();
    setIsLoading(true);
    axiosInstance
      .post(
        `https://localhost:7091/Rental/AddNewUserRental`,
        JSON.stringify(allRentalData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log(data);
        if (data.status === 200 || data.status === 201) {
          console.log(data.data);
          navigate("/car/reservation/confirm", {
            state: { details: data.data },
          });
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const keys = name.split(".");

    if (keys.length > 1) {
      setAllRentalData((prev) => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      setAllRentalData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  if (isLoading) {
    return <p>loading ... </p>;
  }

  return (
    <>
      <Container className="mb-5">
        <Row className="m-5">
          <h2 className="text-center">Rezerwacja</h2>
        </Row>
        <Form onSubmit={addRental}>
          <Row>
            <Col lg={4}>
              <Card className="m-2 p-4">
                <Card.Title>Twoje dane</Card.Title>
                <Card.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>Imię</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Imię"
                      name="ClientDetails.FirstName"
                      value={allRentalData.ClientDetails.FirstName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Nazwisko</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Nazwisko"
                      name="ClientDetails.LastName"
                      value={allRentalData.ClientDetails.LastName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Numer telefonu</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Numer telefonu"
                      name="ClientDetails.PhoneNumber"
                      value={allRentalData.ClientDetails.PhoneNumber}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="Email"
                      name="ClientDetails.Email"
                      value={allRentalData.ClientDetails.Email}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Adres"
                      name="ClientDetails.Address"
                      value={allRentalData.ClientDetails.Address}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Row className="mb-3">
                    <Form.Group as={Col}>
                      <Form.Label>Kod Pocztowy</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Kod pocztowy"
                        name="ClientDetails.PostCode"
                        value={allRentalData.ClientDetails.PostCode}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Miasto"
                        name="ClientDetails.City"
                        value={allRentalData.ClientDetails.City}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4}>
              <Row className="m-2">
                <Card className="p-4">
                  <Card.Title>Twoja rezerwacja</Card.Title>
                  <Card.Body>
                    <Row>
                      <Form.Group as={Col}>
                        <Form.Label>Od</Form.Label>
                        <Form.Control
                          required
                          type="date"
                          name="NewRentalForClient.DateFrom"
                          value={allRentalData.NewRentalForClient.DateFrom}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label>Do</Form.Label>
                        <Form.Control
                          required
                          type="date"
                          name="NewRentalForClient.DateTo"
                          value={allRentalData.NewRentalForClient.DateTo}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mt-3">
                      <Form.Group className="mb-3">
                        <Form.Label>Numer prawa jazdy</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Numer prawa jazdy"
                        />
                      </Form.Group>
                    </Row>
                  </Card.Body>
                </Card>
              </Row>
              <Row className="m-2 mt-5">
                <Card className="p-4">
                  <Card.Title>Dane do faktury</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    (wypełnij jeżeli potrzebujesz otrzymać fakturę VAT)
                  </Card.Subtitle>
                  <Card.Body>
                    <Row className="mt-2">
                      <Form.Group as={Col}>
                        <Form.Label>Nazwa firmy</Form.Label>
                        <Form.Control type="text" name="Nazwa firmy" />
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label>NIP</Form.Label>
                        <Form.Control type="text" name="NIP" />
                      </Form.Group>
                    </Row>
                    <Row className="mt-3">
                      <Form.Group as={Col}>
                        <Form.Label>Adres</Form.Label>
                        <Form.Control type="text" name="Adres" />
                      </Form.Group>
                    </Row>
                    <Row className="mt-3">
                      <Form.Group as={Col}>
                        <Form.Label>Kod pocztowy</Form.Label>
                        <Form.Control type="text" name="Kod pocztowy" />
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label>Miasto</Form.Label>
                        <Form.Control type="text" name="Miasto" />
                      </Form.Group>
                    </Row>
                  </Card.Body>
                </Card>
              </Row>
            </Col>

            <Col lg={4}>
              <Card className="m-2">
                <Card.Body>
                  <Card.Title>Płatność</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Card Subtitle
                  </Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Row>
                    <Col className="text-center">
                      <Button className="w-75 customButton" type="submit">
                        Zapłać online
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}

export default RentalDetail;
