import { useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./../../utils/axiosConfig";
import { useSelector } from "react-redux";

function RentalData({ allRentalData, setAllRentalData }) {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isLogin) {
      getUserDate();
    }
  }, [user.isLogin]);

  const getUserDate = () => {
    setIsLoading(true);
    axiosInstance
      .get(`https://localhost:7091/Users/GetDefaultDataForRental`)
      .then((response) => {
        setAllRentalData((prev) => ({
          ...prev,
          ClientDetails: {
            ...prev.ClientDetails,
            FirstName: response.data.firstName,
            LastName: response.data.lastName,
            Email: response.data.email,
            PhoneNumber: response.data.phoneNumber,
            Address: response.data.address,
            PostCode: response.data.postCode,
            City: response.data.city,
          },
        }));
      })
      .catch((error) => {
        console.log(error);
      })
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
              <Form.Group as={Col} xs={12} xl={6}>
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
              <Form.Group as={Col} xl={6} className="mt-xd-2">
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
                <Form.Group as={Col} xs={12} xl={6}>
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
                <Form.Group as={Col} xs={12} xl={6}>
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
    </>
  );
}

export default RentalData;
