import { useState } from "react";
import { Card, Col, Container, Form, Button, Row } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";

function AddNewWorker() {
  const initialState = {
    userName: "",
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
    jwtInterceptor
      .post(`authentication/registerNewWorker`, JSON.stringify(newUser), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        if (data === 201) {
          console.log("register ok");
          //navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Card className="p-4 customCard">
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col xs={12}>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridFirstName">
                      <Form.Label>Imie</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Imie"
                        name="firstName"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridLastName">
                      <Form.Label>Nazwisko</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Nazwisko"
                        name="lastName"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridUserName">
                      <Form.Label>Nazwa użytkownika</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Nazwa użytkownika"
                        name="userName"
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
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridphoneNumber">
                      <Form.Label>Numer telefonu</Form.Label>
                      <Form.Control
                        required
                        type="tel"
                        maxLength={10}
                        placeholder="Numer telefonu"
                        name="phoneNumber"
                        value={newUser.phoneNumber}
                        onChange={handlePhoneNumber}
                      />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Hasło</Form.Label>
                      <Form.Control
                        required
                        type="password"
                        placeholder="Hasło"
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
                      <Form.Label>Potwierdź hasło</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Potwierdź hasło"
                        name="confirm"
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid password.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col}>
                      <Button
                        variant="dark"
                        className="customButton mt-2 w-100"
                        type="submit"
                      >
                        Dodaj Pracownik
                      </Button>
                    </Form.Group>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default AddNewWorker;
