import { Row, Col, Form, Button } from "react-bootstrap";

function InvoiceReportData({ invoiceData, setInvoceData }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInvoceData((param) => ({
      ...param,
      [name]: value,
    }));
  };

  const onCancelClick = () => {
    setInvoceData((param) => ({
      ...param,
      CreatedDateFrom: "",
      CreatedDateTo: "",
    }));
  };

  //CreatedDateFrom: "",
  //CreatedDateTo: "",

  return (
    <Row>
      <Col xl={3} md={5}>
        <Form.Group>
          <Form.Label>Od</Form.Label>
          <Form.Control
            type="date"
            name="CreatedDateFrom"
            value={invoiceData.CreatedDateFrom}
            onChange={handleChange}
          />
        </Form.Group>
      </Col>
      <Col xl={3} md={5}>
        <Form.Group>
          <Form.Label>Do</Form.Label>
          <Form.Control
            type="date"
            name="CreatedDateTo"
            value={invoiceData.CreatedDateTo}
            onChange={handleChange}
          />
        </Form.Group>
      </Col>
      <Col>
        <Button
          style={{ marginTop: 37 }}
          className=""
          size="sm"
          variant="dark"
          onClick={onCancelClick}
        >
          X
        </Button>
      </Col>
    </Row>
  );
}

export default InvoiceReportData;
