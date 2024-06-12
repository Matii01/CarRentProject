import { useState } from "react";
import { Card, Col, Container, Form, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";

function RegisterPage() {
  const navigate = useNavigate();

  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirm: "",
  };
  const [passwordError, setPasswordError] = useState("");
  const [newUser, setNewUser] = useState(initialState);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(newUser);
    if (newUser.password !== newUser.confirm) {
      console.log(passwordError);
      setPasswordError("Confirm password != password");
      return;
    }
    registerNewUser();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePhoneNumber = (event) => {
    const value = event.target.value;
    const cleanValue = value.replace(/\D+/g, "");
    setNewUser((prevState) => ({
      ...prevState,
      ["phoneNumber"]: cleanValue,
    }));
  };

  const handlePassword = (event) => {
    const value = event.target.value;
    setNewUser((prevState) => ({
      ...prevState,
      ["password"]: value,
    }));

    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    let error = "";
    if (value.length < minLength) {
      error = `Password must be at least ${minLength} characters long.`;
    } else if (!hasUpperCase) {
      error = "Password must contain at least one uppercase letter.";
    } else if (!hasLowerCase) {
      error = "Password must contain at least one lowercase letter.";
    } else if (!hasNumber) {
      error = "Password must contain at least one number.";
    } else if (!hasSpecialChar) {
      error = "Password must contain at least one special character.";
    }
    setPasswordError(error);
  };

  const registerNewUser = () => {
    axiosInstance
      .post(`/authentication`, JSON.stringify(newUser), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const url =
    "https://firebasestorage.googleapis.com/v0/b/car-rental-7fc22.appspot.com/o/car-login.jpg?alt=media&token=0bee9f6d-4e32-4eab-9289-e650ba1fedcc";

  return (
    <Container className="mt-4 mb-4 loginContainer">
      <Card className="p-4 customCard">
        <Row>
          <Col xs={12} md={6}>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col xs={12}>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        required
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridphoneNumber">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        required
                        type="tel"
                        maxLength={10}
                        placeholder="Phone number"
                        name="phoneNumber"
                        value={newUser.phoneNumber}
                        onChange={handlePhoneNumber}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handlePassword}
                      />
                      {passwordError && (
                        <p className="error">{passwordError}</p>
                      )}
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridConfirmPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        name="confirm"
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid city.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col}>
                      <Button className="customButton mt-2 w-100" type="submit">
                        Create account
                      </Button>
                    </Form.Group>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col>
            <Card.Img className="mt-4" src={url} />
            <p className="mt-3 customFont">
              Unlock the road to freedom and adventure! Create your account with
              our car rental service today and explore destinations at your own
              pace. With easy bookings, a wide range of vehicles, and
              competitive pricing, we make driving journeys unforgettable. Sign
              up now and steer your way to new experiences! 🚗💨🌟
            </p>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default RegisterPage;
