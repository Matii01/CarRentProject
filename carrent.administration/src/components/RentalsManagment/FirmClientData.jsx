import { Card, Row, Col } from "react-bootstrap";

function FirmClientData({ client }) {
  return (
    <Card>
      <Card.Header>Dane klienta</Card.Header>
      <Card.Body>
        <Row>
          <Col>Adam Nijaki</Col>
        </Row>
        <Row>
          <Col>795 Folsom Ave, Suite 600</Col>
        </Row>
        <Row>
          <Col>San Francisco, CA 94107</Col>
        </Row>
        <Row>
          <Col>P: (123) 456-7890</Col>
        </Row>
        <Row>
          <Col>M: (+01) 12345 67890</Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default FirmClientData;
