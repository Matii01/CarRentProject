import { useEffect, useState } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";

function ManageSettings() {
  const [info, setInfo] = useState({
    sendNotificationOnRentalStatusUpdate: true,
    sendNotificationOnInvoiceStatusUpdate: true,
    sendNotificationOnRentalCreate: true,
  });

  useEffect(() => {
    jwtInterceptor
      .get(`ApplicationSettings`)
      .then((data) => {
        setInfo(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    const { name } = event.target;
    setInfo((prev) => ({
      ...prev,
      [name]: event.target.checked,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    jwtInterceptor
      .post(`ApplicationSettings`, JSON.stringify(info), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Card>
        <Card.Header>Ustanienia</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>
                  Wyśli informację po dodaniu wypożyczenia
                </Form.Label>
                <input
                  type="checkbox"
                  name="sendNotificationOnRentalCreate"
                  checked={info.sendNotificationOnRentalCreate}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>
                  Wyśli informację po aktualizacji statusu wypożyczenia
                </Form.Label>
                <input
                  type="checkbox"
                  name="sendNotificationOnRentalStatusUpdate"
                  checked={info.sendNotificationOnRentalStatusUpdate}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>
                  Wyśli informację po aktualizacji statusu faktury
                </Form.Label>
                <input
                  type="checkbox"
                  name="sendNotificationOnInvoiceStatusUpdate"
                  checked={info.sendNotificationOnInvoiceStatusUpdate}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>

            <Button variant="dark" type="submit">
              Zapisz
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default ManageSettings;
