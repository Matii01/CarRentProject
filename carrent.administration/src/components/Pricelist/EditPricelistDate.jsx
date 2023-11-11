import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import fetchData from "../../functions/fetchData";
import styles from "./../../components/Table/Table.module.css";

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
    fetchData(
      `https://localhost:7091/CarPriceList/${pricelistId}/PricelistDate`
    )
      .then((data) => {
        setPricelistDates(data);
        console.log("data");
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    console.log(newData);
    fetchData("https://localhost:7091/CarPriceList/addDate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: newData,
    })
      .then((data) => {
        getData();
        console.log(data);
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
    fetch(`https://localhost:7091/CarPriceList/deletePricelistDate/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        if (response.status == 200 || response.status == 204) {
          console.log("ok 200");
          getData();
        }
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
