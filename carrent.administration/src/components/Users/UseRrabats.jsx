import { useState } from "react";
import { Row, Card, Form, Col, Button } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";

function UserRabats({ userId }) {
  const [newUserRabat, setNewUserRabat] = useState({
    UserAccountId: userId,
    Title: "",
    RabatPercentValue: 0,
    DateOfExpiration: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    jwtInterceptor
      .post(``, JSON.stringify(newUserRabat), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log(data);
      });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setNewUserRabat((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Card style={{ borderColor: "transparent" }}>
        <Form onSubmit={handleSubmit} className="m-2">
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Tytuł</Form.Label>
              <Form.Control
                type="text"
                name="Title"
                value={newUserRabat.Title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Wartość w %</Form.Label>
              <Form.Control
                type="number"
                name="RabatPercentValue"
                value={newUserRabat.RabatPercentValue}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Data wygaśnięcia</Form.Label>
            <Form.Control
              type="date"
              name="DateOfExpiration"
              value={newUserRabat.DateOfExpiration}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="dark" type="submit">
            Zapisz
          </Button>
        </Form>
      </Card>
    </>
  );
}

export default UserRabats;
