import { useEffect, useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";

function ChangePassword() {
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    retypePassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    jwtInterceptor
      .post(`Users/ChangePassword`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h4">Zmiana hasła</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mt-2">
            <Form.Group as={Col}>
              <Form.Label>Stare hasło</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Old Password"
                name="oldPassword"
                value={data.oldPassword}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Wymagane
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mt-2">
            <Form.Group as={Col}>
              <Form.Label>Nowe hasło</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="New Password"
                name="newPassword"
                value={data.newPassword}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Looks good!
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mt-2">
            <Form.Group as={Col}>
              <Form.Label>Wpisz ponownie hasło </Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Retype Password"
                name="retypePassword"
                value={data.retypePassword}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Looks good!
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mt-3">
            <Col>
              <Button variant="dark" type="submit">
                Aktualizuj
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ChangePassword;
