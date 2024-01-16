import { useEffect, useState } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";

function AboutCompany() {
  const [info, setInfo] = useState({
    nip: " as",
    regon: " as",
    name: " dsa",
    owner: " asd",
    address: " asd",
    phoneNumber: "as ",
    email: " as",
    state: " asd",
    city: " asd",
    image: " asd",
  });

  useEffect(() => {
    jwtInterceptor
      .get(`AboutCompany`)
      .then((data) => {
        setInfo(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(info);
  };

  return (
    <Card>
      <Card.Header>Firma</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Nip</Form.Label>
              <Form.Control
                type="text"
                name="nip"
                value={info.nip}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>REGON</Form.Label>
              <Form.Control
                type="text"
                value={info.regon}
                name="regon"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Nazwa</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                value={info.name}
                name="name"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Właściciel</Form.Label>
              <Form.Control
                type="text"
                value={info.owner}
                name="owner"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="1234 Main St"
              name="address"
              value={info.address}
              onChange={handleChange}
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Numer telefonu</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={info.phoneNumber}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={info.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                value={info.city}
                name="city"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>ImageUrl</Form.Label>
              <Form.Control
                type="text"
                placeholder="text"
                value={info.state}
                name="state"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="1234 Main St"
              name="image"
              value={info.image}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="dark" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AboutCompany;
