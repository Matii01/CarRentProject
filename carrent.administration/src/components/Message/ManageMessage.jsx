import { useState } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import AnswerMessage from "./AnswerMessage";

function ManageMessage({ message }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowAnswer(true);
  };

  const onSend = (item) => {};

  const handleChange = () => {};

  return (
    <>
      <Row>
        <Card>
          <Card.Header></Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Imie</Form.Label>
                  <Form.Control
                    type="text"
                    value={message.name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    value={message.email}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Wysłana</Form.Label>
                  <Form.Control
                    type="text"
                    value={message.createdDate}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Data odpowiedzi</Form.Label>
                  <Form.Control
                    type="text"
                    value={message.answeredDate}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Kto odpowiedział</Form.Label>
                <Form.Control
                  value={message.whoAnswerId}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Wiadomość</Form.Label>
                <Form.Control
                  as={"textarea"}
                  style={{ height: "150px" }}
                  value={message.messageText}
                  onChange={handleChange}
                />
              </Form.Group>
              {message.isAnswered && (
                <Button variant="dark">Odpowiedź została już wysłana</Button>
              )}
              {!showAnswer && !message.isAnswered && (
                <Button variant="dark" type="submit">
                  Odpowiedź
                </Button>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Row>
      <Row>
        {showAnswer && (
          <AnswerMessage
            id={message.id}
            onCancel={() => setShowAnswer(false)}
            onSend={onSend}
          />
        )}
      </Row>
    </>
  );
}

export default ManageMessage;
