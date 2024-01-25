import { useEffect, useState } from "react";
import { Button, Card, Form, Col, Row } from "react-bootstrap";
import axiosInstance from "./../../utils/axiosConfig";

function AddCarOpinion({ onCancel, carId, ...props }) {
  const [opinion, setOpinion] = useState({
    carId: carId,
    title: "",
    text: "",
    mark: 6,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setOpinion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(opinion);
    axiosInstance
      .post(`CarOpinion/create`, JSON.stringify(opinion), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log(data);
        onCancel();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card {...props}>
      <Card.Header className="cardHeader">
        <Button variant="outline-light" onClick={onCancel}>
          Cancel
        </Button>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={onSubmit}>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  placeholder="title"
                  name="title"
                  type="text"
                  value={opinion.title}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group controlId="formGridState">
                <Form.Label>Mark</Form.Label>
                <Form.Select
                  defaultValue={6}
                  name="mark"
                  onChange={handleChange}
                >
                  <option value={6}>6</option>
                  <option value={5}>5</option>
                  <option value={4}>4</option>
                  <option value={3}>3</option>
                  <option value={2}>2</option>
                  <option value={1}>1</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Opinion</Form.Label>
            <Form.Control
              required
              as="textarea"
              placeholder="..."
              type="text"
              name="text"
              value={opinion.text}
              onChange={handleChange}
              style={{ height: 100 }}
            />
          </Form.Group>
          <Button className="customButton w-25 mt-1" type="submit">
            Save
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddCarOpinion;
