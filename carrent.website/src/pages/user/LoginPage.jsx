import { useEffect, useState } from "react";
import { Container, Form, Button, Card, Col, Row } from "react-bootstrap";
import SetLocalStorage from "../../hooks/SetLocalStorage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosConfig";

function LoginPage() {
  const [error, setError] = useState();
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [setLocalStorage] = SetLocalStorage();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.isLogin) {
      console.log("is login");
      navigate("/user");
    }
    console.log("is logout");
  }, [user]);

  const login = () => {
    console.log(loginForm);
    axiosInstance
      .post(`/authentication/login`, JSON.stringify(loginForm), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        setTokens(data.data);
        navigate("/car/cars");
      })
      .catch((error) => {
        setError("Incorrect login or password");
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
    setError("");
  };

  const goToRegister = () => {
    navigate("/register");
  };

  const url =
    "https://firebasestorage.googleapis.com/v0/b/car-rental-7fc22.appspot.com/o/car-login.jpg?alt=media&token=0bee9f6d-4e32-4eab-9289-e650ba1fedcc";

  return (
    // <Container className="mt-4 mb-4" fluid="xs">
    <Container className="mt-4 mb-4 loginContainer">
      <Card className="p-4 customCard">
        <Row>
          <Col xs={12} md={6}>
            <Form onSubmit={handleLoginClik}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  placeholder="Enter email"
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
              <Row className="text-center p-3 text-danger fs-5">
                {error && <p>{error}</p>}
              </Row>
            </Form>
          </Col>
          <Col className="mt-4 mb-4">
            <Card.Img src={url} />
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default LoginPage;
