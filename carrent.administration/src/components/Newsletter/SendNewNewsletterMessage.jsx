//SendNewNewsletterMessage
import { useEffect, useState } from "react";
import jwtInterceptor from "../../utils/jwtInterceptor";
import { Card, Row, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

function SendNewNewsletterMessage({ onAdd }) {
  const [newMessage, setNewMessage] = useState({
    Title: "",
    Message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewMessage((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    jwtInterceptor
      .post(`Newsletter/sendNewMessage`, JSON.stringify(newMessage), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        clearMessage();
        toast.success("Wysłano wiadomość");
        onAdd();
      })
      .catch((error) => {
        console.log(error);
        toast.success("Błąd");
      });
  };

  const clearMessage = () => {
    setNewMessage((prev) => ({
      ...prev,
      Title: "",
      Message: "",
    }));
  };

  return (
    <>
      <Card style={{ border: 0 }}>
        <Card.Header></Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group>
                <Form.Label>Tyuł</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="tytuł"
                  name="Title"
                  value={newMessage.Title}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group>
                <Form.Label>Wiadomość</Form.Label>
                <Form.Control
                  required
                  as={"textarea"}
                  type="text"
                  placeholder="wiadomość"
                  name="Message"
                  value={newMessage.Message}
                  onChange={handleChange}
                  style={{ height: 200 }}
                />
              </Form.Group>
            </Row>

            <Button variant="dark" type="submit">
              Wyślij
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default SendNewNewsletterMessage;
