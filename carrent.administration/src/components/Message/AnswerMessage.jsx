import { useState } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function AnswerMessage({ id, onSend, onCancel }) {
  const [answer, setAnswer] = useState({ Title: "", AnswerText: "" });
  const [isLoading, setIsloading] = useState(false);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setAnswer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsloading(true);

    jwtInterceptor
      .post(`Messages/AnswerMessage/${id}`, JSON.stringify(answer), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        setIsloading(false);
        onSend(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {isLoading && (
        <Card>
          <LoadingSpinner />
        </Card>
      )}
      {!isLoading && (
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
                  required
                  type="text"
                  name="Title"
                  value={answer.Title}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Treść</Form.Label>
                <Form.Control
                  required
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
      )}
    </>
  );
}

export default AnswerMessage;
