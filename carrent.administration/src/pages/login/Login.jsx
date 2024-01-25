import axios from "axios";
import { useState } from "react";
import { Row, Col, Container, Form, Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUserName, setUserRoles } from "../../shared/userSlice";
import jwtInterceptor from "../../utils/jwtInterceptor";

function Login() {
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({
    username: "JaneDoe",
    password: "Pa$$word1000",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onLoginAsWorkerClick = () => {
    jwtInterceptor
      .post(
        `authentication/login`,
        JSON.stringify({
          username: "ANijaka",
          password: "Pa$$word1000",
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log(data);
        setData(data.data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onLoginClick = () => {
    jwtInterceptor
      .post(`authentication/login`, JSON.stringify(loginForm), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log(data);
        setData(data.data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function setData(data) {
    localStorage.setItem("accessToken", data.token.accessToken);
    localStorage.setItem("refreshToken", data.token.refreshToken);
    dispatch(setUserName({ userName: data.userName }));
    dispatch(setUserRoles({ role: data.role }));
  }

  const url =
    "https://firebasestorage.googleapis.com/v0/b/car-rental-7fc22.appspot.com/o/car-login.jpg?alt=media&token=0bee9f6d-4e32-4eab-9289-e650ba1fedcc";

  //#f7f7f8
  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "#f7f7f8" }}>
      <Container
        className="pt-4 pb-4"
        style={{ width: "58rem", backgroundColor: "" }}
      >
        <Card className="p-4">
          <Row>
            <Col xs={12} md={6}>
              <legend>Wypożyczalnia - administrator</legend>
              <Form.Group className="mb-3">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  onChange={handleChange}
                  value={loginForm.username}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={loginForm.password}
                />
              </Form.Group>
              <Button variant="dark" type="button" onClick={onLoginClick}>
                Login
              </Button>
              <Button
                variant="dark"
                type="button"
                onClick={onLoginAsWorkerClick}
              >
                Login as Worker
              </Button>
            </Col>
            <Col className="mt-4 mb-4">
              <Card.Img src={url} />
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}

export default Login;
