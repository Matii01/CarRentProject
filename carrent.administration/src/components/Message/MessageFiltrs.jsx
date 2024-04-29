import { Form, Row, Col, Button } from "react-bootstrap";

function MessageFiltrs({ filtrs, setFiltrs, onSubmit }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFiltrs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelect = (event) => {
    const { value } = event.target;
    console.log(value);

    setFiltrs((prev) => ({
      ...prev,
      IsAnswered: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  const resetFiltrs = () => {
    console.log("asdasd");
    setFiltrs((prev) => ({
      ...prev,
      Name: "",
      Email: "",
      CreatedStart: "",
      CreatedEnd: "",
      AnsweredStart: "",
      AnsweredEnd: "",
      IsAnswered: "",
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="d-flex justify-content-end">
          <Button variant="dark" size="sm" onClick={resetFiltrs}>
            Resetuj filtry
          </Button>
        </Col>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Imie</Form.Label>
          <Form.Control
            type="text"
            name="Name"
            value={filtrs.Name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="Email"
            value={filtrs.Email}
            onChange={handleChange}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Data wysłanie od</Form.Label>
          <Form.Control
            type="date"
            name="CreatedStart"
            value={filtrs.CreatedStart}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Data wysłanie do</Form.Label>
          <Form.Control
            type="date"
            name="CreatedEnd"
            value={filtrs.CreatedEnd}
            onChange={handleChange}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Data odpowiedzi od</Form.Label>
          <Form.Control
            type="date"
            name="AnsweredStart"
            value={filtrs.AnsweredStart}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Data odpowiedzi do</Form.Label>
          <Form.Control
            type="date"
            name="AnsweredEnd"
            value={filtrs.AnsweredEnd}
            onChange={handleChange}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Status odpowiedzi</Form.Label>
          <Form.Select value={filtrs.IsAnswered} onChange={handleSelect}>
            <option value="">Wszystkie</option>
            <option value={false}>Brak odpowiedźi</option>
            <option value={true}>Odpowiedź wysłana</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Row>
        <Col className="d-flex justify-content-end">
          <Button variant="dark" size="sm" type="submit">
            Zastosuj
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default MessageFiltrs;
