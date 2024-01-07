import { Card, Row, Col } from "react-bootstrap";

function PaymentSummary({ invoiceItems }) {
  const gross = invoiceItems.reduce((accumulate, currentObject) => {
    return accumulate + currentObject.gross;
  }, 0);

  const tax = invoiceItems.reduce((accumulate, currentObject) => {
    return accumulate + currentObject.vatValue;
  }, 0);

  const net = invoiceItems.reduce((accumulate, currentObject) => {
    return accumulate + currentObject.net;
  }, 0);

  const rabat = invoiceItems.reduce((accumulate, currentObject) => {
    return accumulate + currentObject.rabat;
  }, 0);

  return (
    <>
      <Card>
        <Card.Header>Podsumowanie</Card.Header>
        <Card.Body>
          <Row>
            <Col>Netto :</Col>
            <Col className="d-flex justify-content-end">{net}</Col>
          </Row>
          <Row>
            <Col>Podatek :</Col>
            <Col className="d-flex justify-content-end">{tax}</Col>
          </Row>
          <Row>
            <Col>Rabat :</Col>
            <Col className="d-flex justify-content-end">{rabat}</Col>
          </Row>
          <Row>
            <Col>Brutto:</Col>
            <Col className="d-flex justify-content-end">{gross}</Col>
          </Row>
          <hr />
          <Row>
            <Col>Całkowita: </Col>
            <Col className="d-flex justify-content-end">{gross}</Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default PaymentSummary;
