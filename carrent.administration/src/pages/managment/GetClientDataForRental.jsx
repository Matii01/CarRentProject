import { useState } from "react";
import { Button, Card, Col, Container, Row, Form } from "react-bootstrap";

function GetClientDataForRental({ onNext }) {
  const Individual = "INDIVIDUAL";
  const Firm = "FIRM";
  const Choose = "CHOOSE";
  const [IndividualClient, setIndividualClient] = useState(
    IndividualClientDetails
  );
  const [firmClient, setFirmClient] = useState(FirmClientDetails);
  const [selected, setSelected] = useState(Individual);

  const changeView = (view) => {
    setSelected(view);
  };

  const handleIndividualChange = (event) => {
    const { name, value } = event.target;
    setIndividualClient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFirmChange = (event) => {
    const { name, value } = event.target;
    setFirmClient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextClick = (event) => {
    event.preventDefault();
    console.log(selected);
    if (selected === Individual) {
      onNext(IndividualClient, "Individual");
    } else if (selected === Firm) {
      onNext(firmClient, "Firm");
    }
  };

  return (
    <>
      <Form onSubmit={nextClick}>
        <Card>
          <Card.Header>
            <Row>
              <Col>
                <Button
                  variant="dark"
                  size="sm"
                  className="w-100"
                  onClick={() => changeView(Individual)}
                >
                  Klient Indywidualny
                </Button>
              </Col>
              <Col>
                <Button
                  variant="dark"
                  size="sm"
                  className="w-100"
                  onClick={() => changeView(Firm)}
                >
                  Klient Firma
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Row>
              {selected == Individual && (
                <Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Imię</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Imię"
                      name="FirstName"
                      value={IndividualClient.FirstName}
                      onChange={handleIndividualChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Nazwisko</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Nazwisko"
                      name="LastName"
                      value={IndividualClient.LastName}
                      onChange={handleIndividualChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Numer telefonu</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Numer telefonu"
                      name="PhoneNumber"
                      value={IndividualClient.PhoneNumber}
                      onChange={handleIndividualChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="Email"
                      name="Email"
                      value={IndividualClient.Email}
                      onChange={handleIndividualChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Adres"
                      name="Address"
                      value={IndividualClient.Address}
                      onChange={handleIndividualChange}
                    />
                  </Form.Group>
                  <Row className="mb-3">
                    <Form.Group as={Col} xs={12} xl={6}>
                      <Form.Label>Kod Pocztowy</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Kod pocztowy"
                        name="PostCode"
                        value={IndividualClient.PostCode}
                        onChange={handleIndividualChange}
                      />
                    </Form.Group>
                    <Form.Group as={Col} xl={6} className="mt-xd-2">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Miasto"
                        name="City"
                        value={IndividualClient.City}
                        onChange={handleIndividualChange}
                      />
                    </Form.Group>
                  </Row>
                </Row>
              )}
              {selected == Firm && (
                <Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Nazwa Firmy</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Nazwa"
                      name="CompanyName"
                      value={firmClient.CompanyName}
                      onChange={handleFirmChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>NIP</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="NIP"
                      name="NIP"
                      value={firmClient.NIP}
                      onChange={handleFirmChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Miasto</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Miasto"
                      name="City"
                      value={firmClient.City}
                      onChange={handleFirmChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Ulica i numer</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Ulica i numer"
                      name="StreetAndNumber"
                      value={firmClient.StreetAndNumber}
                      onChange={handleFirmChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Kod pocztowy</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Kod pocztowy"
                      name="PostCode"
                      value={firmClient.PostCode}
                      onChange={handleFirmChange}
                    />
                  </Form.Group>
                </Row>
              )}
            </Row>
          </Card.Body>
        </Card>
        <Row className="mt-5 d-flex justify-content-center">
          <Col xl={9}>
            <Row>
              <Col>
                <Button variant="dark" size="sm" className="w-100">
                  Powrót
                </Button>
              </Col>
              <Col>
                <Button
                  variant="dark"
                  size="sm"
                  className="w-100"
                  type="submit"
                >
                  Dalej
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default GetClientDataForRental;

const IndividualClientDetails = {
  FirstName: "",
  LastName: "",
  Email: "",
  PhoneNumber: "",
  Address: "",
  PostCode: "",
  City: "",
};

const FirmClientDetails = {
  NIP: "",
  CompanyName: "",
  StreetAndNumber: "",
  PostCode: "",
  City: "",
};
