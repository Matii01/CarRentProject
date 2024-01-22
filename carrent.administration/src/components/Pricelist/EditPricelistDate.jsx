import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import fetchData from "../../functions/fetchData";
import styles from "./../../components/Table/Table.module.css";
import jwtInterceptor from "../../utils/jwtInterceptor";
import { formatDate } from "./../../utils/formDate";

function EditPricelistDate({ pricelistId }) {
  const initialState = {
    PriceId: pricelistId,
    DateFrom: "",
    DateTo: "",
  };
  const [pricelistDates, setPricelistDates] = useState();
  const [newData, setNewData] = useState(initialState);

  useEffect(() => {
    getData();
  }, [pricelistId]);

  const getData = () => {
    jwtInterceptor
      .get(`CarPriceList/${pricelistId}/PricelistDate`)
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
    setPricelistDates(transformed);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    jwtInterceptor
      .post(`CarPriceList/addDate`, JSON.stringify(newData), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        getData();
        setNewData(initialState);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onDeleteClick = (itemId) => {
    jwtInterceptor
      .delete(`CarPriceList/deletePricelistDate/${itemId}`)
      .then((response) => {
        getData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (!pricelistDates) {
    return <p>loading...</p>;
  }

  return (
    <>
      <Row>
        <Form onSubmit={onSubmit}>
          <Row>
            <Col>
              <Button type="submit" className="m-2" variant="primary" size="sm">
                Zapisz
              </Button>
              <Button className="m-2" variant="secondary" size="sm">
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
                  name="DateFrom"
                  value={newData.DateFrom}
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Data obowiązywania do</Form.Label>
                <Form.Control
                  type="date"
                  name="DateTo"
                  value={newData.DateTo}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Row>
      <Row>
        <Container>
          <Card>
            <Card.Body>
              <table
                className={`${styles.table}`}
                style={{
                  fontSize: "12px",
                }}
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Data od</th>
                    <th>Data do</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pricelistDates.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.dateFrom}</td>
                      <td>{item.dateTo}</td>
                      <td>
                        <Button
                          size="sm"
                          onClick={() => onDeleteClick(item.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Container>
      </Row>
    </>
  );
}

export default EditPricelistDate;
