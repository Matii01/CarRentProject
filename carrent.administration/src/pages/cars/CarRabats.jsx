import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { formatDate } from "../../utils/formDate";
import MyTableWithPagination from "../../components/Table/MyTableWithPagination";
import jwtInterceptor from "../../utils/jwtInterceptor";
import { ToastContainer, toast } from "react-toastify";

function CarRabats() {
  const param = useParams();
  const [rabats, setRabats] = useState([]);
  const [newRabat, setNewRabat] = useState({
    RabatPercentValue: "",
    DateFrom: "",
    DateTo: "",
  });

  useEffect(() => {
    getRabats();
  }, []);

  const getRabats = () => {
    jwtInterceptor
      .get(`Rabat/carRabats/${param.carId}`)
      .then((data) => {
        transformAndSetData(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const transformAndSetData = (data) => {
    const transformed = data.map((it) => ({
      ...it,
      dateFrom: formatDate(it.dateFrom),
      dateTo: formatDate(it.dateTo),
    }));
    setRabats(transformed);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setNewRabat((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(newRabat);

    jwtInterceptor
      .post(`Rabat/addCarRabat/${param.carId}`, JSON.stringify(newRabat), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        console.log(data);
        toast.error("Pomyślnie zapisano");
        getRabats();
      })
      .catch((error) => {
        toast.error(error.response.data.Message);
      });
  };

  const deleteRabat = (id) => {
    console.log(id);
  };

  return (
    <>
      <ToastContainer />
      <Container style={{ fontSize: "12px" }}>
        <Row>
          <Col xs={5}>
            <Row>
              <Card style={{ borderColor: "transparent" }}>
                <Form onSubmit={handleSubmit} className="m-2">
                  <Row>
                    <Form.Group as={Col}>
                      <Form.Label>Wartość w %</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        name="RabatPercentValue"
                        value={newRabat.RabatPercentValue}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>

                  <Row>
                    <Form.Group
                      as={Col}
                      className="mb-3"
                      controlId="formGridAddress1"
                    >
                      <Form.Label>Data od</Form.Label>
                      <Form.Control
                        required
                        type="date"
                        name="DateFrom"
                        value={newRabat.DateFrom}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      className="mb-3"
                      controlId="formGridAddress1"
                    >
                      <Form.Label>Data do</Form.Label>
                      <Form.Control
                        required
                        type="date"
                        name="DateTo"
                        value={newRabat.DateTo}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>

                  <Button variant="dark" type="submit">
                    Zapisz
                  </Button>
                </Form>
              </Card>
            </Row>
            <Row>
              {rabats && (
                <MyTableWithPagination
                  thead={["Id", "Od", "Do", "Wartosć", ""]}
                  items={rabats}
                  item={["id", "dateFrom", "dateTo", "rabatPercentValue"]}
                  handleDelete={deleteRabat}
                />
              )}
            </Row>
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </>
  );
}

export default CarRabats;
