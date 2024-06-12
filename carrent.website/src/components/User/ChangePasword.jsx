import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useChangeUserPasswordMutation } from "../../api/userApi";
import InformationModal from "../Modal/InformationModal";

function ChangePasword() {
  const [changePassword, result] = useChangeUserPasswordMutation();
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    retypePassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setError("");
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (data.newPassword != data.retypePassword) {
      setError("passwords are different");
      return;
    }
    const response = await changePassword(data);
    console.log(response);

    if (response.error) {
      setError(response.error.data.message);
      return;
    }
    setData({
      oldPassword: "",
      newPassword: "",
      retypePassword: "",
    });
    setShowModal(true);
  };

  return (
    <>
      <InformationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        infoText={"Password has been changed"}
      />
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
    </>
  );
}

export default ChangePasword;
