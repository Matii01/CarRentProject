import { useEffect } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";

function Permissions({ workerId }) {
  useEffect(() => {
    //jwtInterceptor.get()
  }, [workerId]);

  return (
    <Card>
      <Card.Header>Edytuj uprawnienia</Card.Header>
      <Card.Body>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Select defaultValue="Choose...">
                <option>Choose...</option>
                <option>...</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" id="formGridCheckbox">
            <input type="checkbox" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Zapisz
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Permissions;
