import { Row, Col, Form, Button } from "react-bootstrap";

function MonthReportData({ monthData, setMonthData }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setMonthData((param) => ({
      ...param,
      [name]: value,
    }));
  };

  const onCancelClick = () => {
    setMonthData((param) => ({
      ...param,
      DateFrom: "",
      DateTo: "",
    }));
  };

  return (
    <Row>
      <Col xl={3} md={5}>
        <Form.Group>
          <Form.Label>Od</Form.Label>
          <Form.Control
            type="date"
            name="DateFrom"
            value={monthData.DateFrom}
            onChange={handleChange}
          />
        </Form.Group>
      </Col>
      <Col xl={3} md={5}>
        <Form.Group>
          <Form.Label>Do</Form.Label>
          <Form.Control
            type="date"
            name="DateTo"
            value={monthData.DateTo}
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

export default MonthReportData;
