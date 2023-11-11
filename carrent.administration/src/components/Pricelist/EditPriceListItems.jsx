import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import styles from "./../../components/Table/Table.module.css";
import fetchData from "../../functions/fetchData";

function EditPricelistItems({ pricelistId }) {
  const initialState = {
    PriceListId: pricelistId,
    Days: "",
    Price: "",
    OverlimitFee: "",
  };
  const [items, setItems] = useState();
  const [newItem, setNewItem] = useState(initialState);

  useEffect(() => {
    getData();
  }, [pricelistId]);

  const getData = () => {
    fetchData(
      `https://localhost:7091/CarPriceList/${pricelistId}/pricelistItems`
    )
      .then((data) => {
        setItems(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(newItem);
    fetchData("https://localhost:7091/CarPriceList/addItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: newItem,
    })
      .then((data) => {
        getData();
        setNewItem(initialState);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onDelete = (itemId) => {
    console.log("delete " + itemId);
  };

  return (
    <>
      <Row>
        <Form className="m-2 pe-4" onSubmit={onSubmit}>
          <Row>
            <Col>
              <Button type="submit" className="m-2" variant="primary" size="sm">
                Zapisz
              </Button>
              <Button
                className="m-2"
                variant="secondary"
                size="sm"
                //onClick={onCancelClick}
              >
                Anuluj
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3 h-50">
                <Form.Label style={{ fontSize: ".7rem" }}>
                  Dni wypożyczenia
                </Form.Label>
                <Form.Control
                  className="h-75"
                  type="number"
                  name="Days"
                  value={newItem.Days}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3 h-50">
                <Form.Label style={{ fontSize: ".7rem" }}>Cena</Form.Label>
                <Form.Control
                  className="h-75"
                  type="number"
                  name="Price"
                  value={newItem.Price}
                  onChange={handleChange}
                  step={0.01}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3 h-50">
                <Form.Label style={{ fontSize: ".7rem" }}>
                  {"Opłata za przekroczenia limitu (za km)"}
                </Form.Label>
                <Form.Control
                  className="h-75"
                  type="number"
                  name="OverlimitFee"
                  value={newItem.OverlimitFee}
                  onChange={handleChange}
                  step={0.01}
                />
              </Form.Group>
            </Col>
            <Col></Col>
          </Row>
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
                    <th>Dni</th>
                    <th>Cena</th>
                    <th>Za przekroczenia</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items &&
                    items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.days}</td>
                        <td>{item.price}</td>
                        <td>{item.overlimitFee}</td>
                        <td>
                          <Button size="sm" onClick={() => onDelete(item.id)}>
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

export default EditPricelistItems;
