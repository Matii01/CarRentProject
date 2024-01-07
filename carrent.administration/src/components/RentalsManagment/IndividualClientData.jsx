import { Card, Row, Col } from "react-bootstrap";

function IndividualClientData({ client }) {
  return (
    <Card>
      <Card.Header>Dane klienta</Card.Header>
      <Card.Body>
        <Row>
          <Col>
            {client.firstName} {client.lastName}
          </Col>
        </Row>
        <Row>
          <Col>{client.address}</Col>
        </Row>
        <Row>
          <Col>
            {client.city} {client.postCode}
          </Col>
        </Row>
        <Row className="mt-1">
          <Col>{client.email}</Col>
        </Row>
        <Row>
          <Col>{client.phoneNumber}</Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default IndividualClientData;
