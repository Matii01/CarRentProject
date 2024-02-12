import { useState } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";

function AnswerMessage({ id, onSend, onCancel }) {
  const [answer, setAnswer] = useState({ Title: "", AnswerText: "" });

  const handleChange = (event) => {
    const { value, name } = event.target;
    setAnswer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(answer);
    jwtInterceptor
      .post(`Messages/AnswerMessage/${id}`, JSON.stringify(answer), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log(data.data);
        onSend(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card>
      <Card.Header>
        <Row>
          <Col className="d-flex justify-content-end">
            <Button size="sm" variant="dark" onClick={onCancel}>
              Anuluj
            </Button>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tytuł</Form.Label>
            <Form.Control
              type="text"
              name="Title"
              value={answer.Title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Odpowieź</Form.Label>
            <Form.Control
              as={"textarea"}
              style={{ height: "150px" }}
              name="AnswerText"
              value={answer.AnswerText}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="dark" type="submit">
            Wyślij
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AnswerMessage;
