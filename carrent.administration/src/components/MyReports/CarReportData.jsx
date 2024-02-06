import { Row, Col, Form, Button } from "react-bootstrap";

function CarReportData({ carData, setCarData }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCarData((param) => ({
      ...param,
      [name]: value,
    }));
  };

  const onCancelClick = () => {
    setCarData((param) => ({
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
            value={carData.DateFrom}
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
            value={carData.DateTo}
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

export default CarReportData;
