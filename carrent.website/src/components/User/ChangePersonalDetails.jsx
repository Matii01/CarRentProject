import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Form } from "react-bootstrap";
import axiosInstance from "./../../utils/axiosConfig";

function ChangePersonalDetails() {
  const [user, setUser] = useState({
    email: " ",
    firstName: " ",
    lastName: " ",
    phoneNumber: " ",
    userName: " ",
  });

  useEffect(() => {
    axiosInstance
      .get("https://localhost:7091/Users/UserPersonalDetails")
      .then((data) => {
        console.log(data);
        setUser(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user);
    axiosInstance
      .post(
        "https://localhost:7091/Users/UpdatePersonalDetails",
        JSON.stringify(user),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log(data);
        setUser(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card>
      <Card.Header className="cardHeader">PERSONAL DETAILS</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First name"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last name"
                name="lastName"
                onChange={handleChange}
                value={user.lastName}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="User name"
                name="userName"
                disabled
                onChange={handleChange}
                value={user.userName}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone number"
                name="phoneNumber"
                onChange={handleChange}
                value={user.phoneNumber}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={user.email}
              />
            </Form.Group>
          </Row>
          <Row className="mt-2">
            <Col>
              <Button className="customButton" type="submit">
                Update
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ChangePersonalDetails;
