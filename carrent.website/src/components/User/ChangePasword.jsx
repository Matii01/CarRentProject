import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";

function ChangePasword() {
  return (
    <Card>
      <Card.Header className="cardHeader">CHANGE YOUR PASSWORD</Card.Header>
      <Card.Body>
        <Form>
          <Form.Group as={Col} controlId="formGridOldPassword">
            <Form.Label>Old Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridNewPasswod">
              <Form.Label>Email</Form.Label>
              <Form.Control type="password" placeholder="Enter new password" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridRetype">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Retype Password" />
            </Form.Group>
          </Row>

          <Button className="customButton" type="submit">
            Change
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ChangePasword;
