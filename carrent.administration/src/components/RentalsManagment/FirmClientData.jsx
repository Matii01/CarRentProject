import { Card, Row, Col } from "react-bootstrap";

function FirmClientData({ client }) {
  console.log(client);
  return (
    <Card>
      <Card.Header>Dane klienta</Card.Header>
      <Card.Body>
        <Row>
          <Col xl={4}>Firma:</Col>
          <Col>{client.companyName}</Col>
        </Row>
        <Row>
          <Col xl={4}>NIP</Col>
          <Col>{client.nip}</Col>
        </Row>
        <Row>
          <Col xl={4}>Miasto</Col>
          <Col>{client.city}</Col>
        </Row>
        <Row>
          <Col xl={4}>Ulica</Col>
          <Col>{client.streetAndNumber}</Col>
        </Row>
        <Row>
          <Col xl={4}>Kod P</Col>
          <Col>{client.postCode}</Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default FirmClientData;
