import axios from "axios";
import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import axiosInstance from "../../utils/axiosConfig";

function ChangePasword() {
  const [error, setError] = useState("");
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    retypePassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);

    if (data.newPassword != data.retypePassword) {
      console.log("passwords are different");
    } else {
      updatePassword();
    }
  };

  const updatePassword = () => {
    axiosInstance
      .post(
        "https://localhost:7091/Users/ChangePassword",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setError("");
          console.log("password was changed");
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setError(error.response.data.message);
      });
  };

  return (
    <Card>
      <Card.Header className="cardHeader">CHANGE YOUR PASSWORD</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="oldPassword"
                value={data.oldPassword}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className="mt-2">
            <Form.Group as={Col}>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                name="newPassword"
                value={data.newPassword}
                onChange={handleChange}
              />
            </Form.Group>

            <Row className="mt-2">
              <Form.Group as={Col}>
                <Form.Label>Retype Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Retype Password"
                  name="retypePassword"
                  value={data.retypePassword}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row className="mt-3">
              <Col>
                <Button className="customButton" type="submit">
                  Change
                </Button>
              </Col>
              <Col>
                <p className="errorText">{error}</p>
              </Col>
            </Row>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ChangePasword;
