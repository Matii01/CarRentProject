import { useEffect, useState } from "react";
import jwtInterceptor from "../../utils/jwtInterceptor";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

function ShowNotification({ item }) {
  const handleChange = () => {};
  const handleSubmit = () => {};
  return (
    <>
      <Card style={{ border: 0 }}>
        <Card.Header></Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Tyuł</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="tytuł"
                    name="title"
                    value={item.title}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Form.Group>
                <Form.Label>Wiadomość</Form.Label>
                <Form.Control
                  required
                  as={"textarea"}
                  type="text"
                  placeholder="wiadomość"
                  name="message"
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

export default ShowNotification;
