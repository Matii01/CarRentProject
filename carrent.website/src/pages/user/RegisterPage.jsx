import { useState } from "react";
import { Card, Col, Container, Form, Button, Row } from "react-bootstrap";
import fetchData from "../../components/functions/fetchData";
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

    // Basic password requirements
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
/* <Form>
          <Row>
            <Col>
              <FormLabel>First Name</FormLabel>
            </Col>
            <Col>
              <Form.Control placeholder="First name" />
            </Col>
          </Row>
        </Form> */

/*
 <section class="vh-100" style={{ backgroundColor: "" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="form3Example1c"
                              class="form-control"
                            />
                            <label className="form-label" for="form3Example1c">
                              Your Name
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="form3Example3c"
                              class="form-control"
                            />
                            <label className="form-label" for="form3Example3c">
                              Your Email
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="form3Example4c"
                              class="form-control"
                            />
                            <label className="form-label" for="form3Example4c">
                              Password
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="form3Example4cd"
                              class="form-control"
                            />
                            <label className="form-label" for="form3Example4cd">
                              Repeat your password
                            </label>
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                          <input
                            class="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="form2Example3c"
                          />
                          <label
                            className="form-check-label"
                            for="form2Example3"
                          >
                            I agree all statements in{" "}
                            <a href="#!">Terms of service</a>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="button" class="btn btn-primary btn-lg">
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        class="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
*/
