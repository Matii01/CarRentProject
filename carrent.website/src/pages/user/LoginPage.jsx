import { useEffect, useState } from "react";
import { Container, Form, Button, Card, Col, Row } from "react-bootstrap";
import SetLocalStorage from "../../hooks/SetLocalStorage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function LoginPage() {
  const [loginForm, setLoginForm] = useState({
    username: "ATestowy",
    password: "Pa$$w0rd",
  });
  const [setLocalStorage] = SetLocalStorage();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.isLogin) {
      navigate("/user");
    }
  }, []);

  const login = () => {
    console.log(loginForm);
    fetch(`https://localhost:7091/authentication/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginForm),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("An Error");
        }
        return response.json();
      })
      .then((data) => {
        setTokens(data);
        navigate("/car/cars");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setTokens = (data) => {
    setLocalStorage(data);
  };

  const handleLoginClik = (event) => {
    event.preventDefault();
    login();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    // <Container className="mt-4 mb-4" fluid="xs">
    <Container className="mt-4 mb-4 loginContainer">
      <Card className="p-4 customCard">
        <Row>
          <Col xs={12} md={6}>
            <Form onSubmit={handleLoginClik}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Login</Form.Label>
                <Form.Control
                  placeholder="Enter login"
                  name="username"
                  onChange={handleChange}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                />
              </Form.Group>

              <Row className="mt-5">
                <Col className="text-center">
                  <Button className="customButton w-100" type="submit">
                    Login
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <Button
                    type="submit"
                    className="mt-4 customButton w-100"
                    onClick={goToRegister}
                  >
                    Create account
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col className="mt-4 mb-4">
            <Card.Img src="imgs/car-login.jpg" />
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default LoginPage;
