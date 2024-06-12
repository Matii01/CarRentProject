import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Form } from "react-bootstrap";
import {
  useChangePersonalDetailsMutation,
  useGetParsonalDeatilsQuery,
} from "../../api/userApi";

function ChangePersonalDetails() {
  const { data, error, isLoading } = useGetParsonalDeatilsQuery();
  const [updateDetails, result] = useChangePersonalDetailsMutation();

  const [user, setUser] = useState({
    email: " ",
    firstName: " ",
    lastName: " ",
    phoneNumber: " ",
    userName: " ",
  });

  useEffect(() => {
    setUser((prev) => ({
      ...prev,
      ...data,
    }));
  }, [data]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateDetails(user);
  };

  if (isLoading) {
    return <>Loading..</>;
  }

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
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="phoneNumber"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                disabled
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={user.email}
              />
            </Form.Group>
          </Row>

          <Row></Row>
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
