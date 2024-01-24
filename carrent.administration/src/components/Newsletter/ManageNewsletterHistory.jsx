import { useEffect, useState } from "react";
import jwtInterceptor from "../../utils/jwtInterceptor";
import { Card, Row, Form, Button, Col } from "react-bootstrap";
import { toast } from "react-toastify";

function ManageNewsletterHistory({ item, hide, onDelete }) {
  const removeFromHistory = () => {
    jwtInterceptor
      .delete(`Newsletter/deleteHistory/${item.id}`)
      .then((data) => {
        hide();
        onDelete();
        toast.success("Usunieto");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Błąd");
      });
  };

  const handleChange = () => {};

  return (
    <>
      <Card className="p-3">
        <Card.Header>
          <Row>
            <Col>
              <Button variant="dark" size="sm" onClick={hide}>
                Zamknij
              </Button>
            </Col>
            <Col>
              <Button variant="dark" size="sm" onClick={removeFromHistory}>
                Usuń z historii
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group>
                <Form.Label>Tyuł</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="tytuł"
                  name="Title"
                  value={item.title}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group>
                <Form.Label>Wysłano</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="tytuł"
                  name="Title"
                  onChange={handleChange}
                  value={item.createdDate}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group>
                <Form.Label>Wiadomość</Form.Label>
                <Form.Control
                  as={"textarea"}
                  type="text"
                  placeholder="wiadomość"
                  name="Message"
                  value={item.message}
                  onChange={handleChange}
                  style={{ height: 200 }}
                />
              </Form.Group>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default ManageNewsletterHistory;
