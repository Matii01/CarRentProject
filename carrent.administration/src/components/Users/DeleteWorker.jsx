import { useState } from "react";
import { Card, Col, Row, Form, Button } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";

function DeleteWorker({ onDelete, workerId }) {
  const [confirm, setConfirm] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();

    jwtInterceptor
      .delete(`Users/deleteWorker/${workerId}`)
      .then((data) => {
        console.log(data);
        onDelete();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    setConfirm(event.target.checked);
  };

  return (
    <Card>
      <Card.Header>
        <h5>Usuń pracownika</h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={onSubmit}>
          <Row>
            <Col className="ms-2">
              <Form.Group controlId="formGridZip">
                <Form.Label>Potwierdzam usunięcie</Form.Label>
                <input
                  className="m-2"
                  type="checkbox"
                  checked={confirm}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col className="ms-1">
              <Button variant="danger" type="submit" disabled={!confirm}>
                Usuń
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default DeleteWorker;
