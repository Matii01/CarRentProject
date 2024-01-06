import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";
import { useParams } from "react-router";

function AddService() {
  const parms = useParams();
  const [item, setItem] = useState({
    carId: parms.carId,
    workerId: "",
    dateStart: "",
    dateEnd: "",
    description: "",
    totalCost: "",
  });
  const onSubmit = (event) => {
    event.preventDefault();
    console.log("zapisz");

    jwtInterceptor
      .post("/CarMaintenance/AddMaintenance1", JSON.stringify(item), {
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onCancelClik = () => {
    setItem({
      carId: 0,
      dateStart: "",
      dateEnd: "",
      description: "",
      totalCost: "",
    });
  };

  return (
    <>
      <Row>
        <Form onSubmit={onSubmit}>
          <Row>
            <Col>
              <Button type="submit" className="m-2" variant="primary" size="sm">
                Zapisz
              </Button>
              <Button
                className="m-2"
                variant="secondary"
                size="sm"
                onClick={onCancelClik}
              >
                Anuluj
              </Button>
            </Col>
          </Row>
        </Form>
        <Form className="m-2">
          <Form.Group
            className="mb-3 pe-3"
            controlId="exampleForm.ControlInput1"
          >
            <Row>
              <Col>
                <Form.Label>Data obowiązywania od</Form.Label>
                <Form.Control
                  type="date"
                  name="dateStart"
                  value={item.dateStart}
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Data obowiązywania do</Form.Label>
                <Form.Control
                  type="date"
                  name="dateEnd"
                  value={item.dateEnd}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Koszt</Form.Label>
                <Form.Control
                  type="number"
                  name="totalCost"
                  value={item.totalCost}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Opis</Form.Label>
                <Form.Control
                  as="textarea"
                  type="test"
                  name="description"
                  value={item.description}
                  onChange={handleChange}
                  style={{ height: 150 }}
                />
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Row>
    </>
  );
}

export default AddService;
