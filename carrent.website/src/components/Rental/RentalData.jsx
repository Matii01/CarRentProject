import { Card, Col, Form, Row } from "react-bootstrap";

function RentalData({ allRentalData, setAllRentalData }) {
  function handleChange(event) {
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
                name="ClientDetails.firstName"
                value={allRentalData.ClientDetails.firstName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nazwisko</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nazwisko"
                name="ClientDetails.lastName"
                value={allRentalData.ClientDetails.lastName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Numer telefonu</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Numer telefonu"
                name="ClientDetails.phoneNumber"
                value={allRentalData.ClientDetails.phoneNumber}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                name="ClientDetails.email"
                value={allRentalData.ClientDetails.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Adres"
                name="ClientDetails.address"
                value={allRentalData.ClientDetails.address}
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
                  name="ClientDetails.postCode"
                  value={allRentalData.ClientDetails.postCode}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col} xl={6} className="mt-xd-2">
                <Form.Label>City</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Miasto"
                  name="ClientDetails.city"
                  value={allRentalData.ClientDetails.city}
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
                    name="NewRentalForClient.dateFrom"
                    value={allRentalData.NewRentalForClient.dateFrom}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Do</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    name="NewRentalForClient.dateTo"
                    value={allRentalData.NewRentalForClient.dateTo}
                    onChange={handleChange}
                  />
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
