import axios from "axios";
import { useState } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setUserName, setUserRoles } from "../../shared/userSlice";

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
    axios
      .post(
        `https://localhost:7091/authentication/login`,
        JSON.stringify({
          username: "Test",
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
    axios
      .post(
        `https://localhost:7091/authentication/login`,
        JSON.stringify(loginForm),
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

  function setData(data) {
    localStorage.setItem("accessToken", data.token.accessToken);
    localStorage.setItem("refreshToken", data.token.refreshToken);
    dispatch(setUserName({ userName: data.userName }));
    dispatch(setUserRoles({ role: data.role }));
  }

  return (
    <Container>
      <Row>
        <Col className="col-md-8 offset-md-2">
          <legend>Login Form</legend>
          <Form.Group className="mb-3">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" name="username" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="button" onClick={onLoginClick}>
            Login
          </Button>
          <Button
            variant="primary"
            type="button"
            onClick={onLoginAsWorkerClick}
          >
            Login as Worker
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
