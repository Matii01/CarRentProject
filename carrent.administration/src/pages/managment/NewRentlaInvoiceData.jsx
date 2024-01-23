import { useState } from "react";
import { Button, Card, Col, Row, Form } from "react-bootstrap";

function NewRentalInvoiceData({ onSubmit }) {
  const [DataForInvoice, setDataForInvoice] = useState({
    PaymentTerm: "",
    ToPaid: 0,
    Paid: 0,
  });

  const onChange = (event) => {
    const { value, name } = event.target;
    setDataForInvoice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitClick = (event) => {
    event.preventDefault();
  };

  const onSaveClick = () => {
    onSubmit(DataForInvoice);
  };

  return (
    <Form onSubmit={onSubmitClick}>
      <Card>
        <Card.Header></Card.Header>
        <Card.Body>
          <Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Termin Płatności</Form.Label>
                  <Form.Control
                    required
                    type="date"
                    name="PaymentTerm"
                    value={DataForInvoice.PaymentTerm}
                    onChange={onChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Do zapłaty</Form.Label>
                  <Form.Control
                    disabled
                    type="number"
                    name="ToPaid"
                    value={DataForInvoice.ToPaid}
                    onChange={onChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Zapłacono</Form.Label>
                  <Form.Control
                    type="number"
                    name="Paid"
                    value={DataForInvoice.Paid}
                    onChange={onChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Row>
          <Row className="mt-4">
            <Col>
              <Button variant="dark" size="sm" onClick={onSaveClick}>
                Zapisz
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Form>
  );
}

export default NewRentalInvoiceData;
