import { useEffect, useState } from "react";
import jwtInterceptor from "../../utils/jwtInterceptor";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

function AddNotificationForUser({ userId, onAdd }) {
  const [notification, setNotification] = useState({
    UserId: userId,
    Title: "",
    Message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNotification((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    jwtInterceptor
      .post(`Notification/create`, JSON.stringify(notification), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log(data);
        clearMessage();
        onAdd();
        toast.success("Dodano nowe powiadomienie");
      })
      .catch((error) => {
        console.log(error);
        toast.success("Dodawanie - bład");
      });
  };

  const clearMessage = () => {
    setNotification((prev) => ({
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
                  value={notification.Title}
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
                  value={notification.Message}
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

export default AddNotificationForUser;
