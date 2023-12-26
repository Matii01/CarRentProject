import { Button, Card, Col, Row, Form } from "react-bootstrap";

function ChangePersonalDetails() {
  return (
    <Card>
      <Card.Header className="cardHeader">PERSONAL DETAILS</Card.Header>
      <Card.Body>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="First name" />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Last name" />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>User Name</Form.Label>
              <Form.Control type="text" placeholder="User name" />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" placeholder="Phone number" />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>
          </Row>
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
