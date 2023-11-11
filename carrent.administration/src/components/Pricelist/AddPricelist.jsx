import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import fetchData from "../../functions/fetchData";

function AddPricelist({ carId, onAdded }) {
  const [pricelistName, setPricelistName] = useState("");
  const [error, setError] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();
    if (pricelistName.trim() === "") {
      setError("the name cannot be empty");
    } else {
      sendNewpriceList();
    }
  };

  // PriceListDto(int Id, int CarId, string? Name);
  // [HttpPost("create/{carId:int}")]
  const sendNewpriceList = () => {
    fetchData(`https://localhost:7091/CarPriceList/create/${carId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { CarId: carId, name: pricelistName },
    })
      .then((data) => {
        console.log(data);
        onAdded();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setPricelistName(value);
    setError(null);
  };

  const onCancelClick = () => {
    setPricelistName("");
    setError(null);
  };

  return (
    <>
      <Card className="p-2">
        <Card.Header>
          <Card.Title as="h5">Cennik - dodawanie</Card.Title>
        </Card.Header>
        <Card.Body className="table-full-width table-responsive px-0">
          <Form onSubmit={onSubmit}>
            <Row>
              <Col>
                <Button
                  type="submit"
                  className="m-2"
                  variant="primary"
                  size="sm"
                >
                  Zapisz
                </Button>
                <Button
                  className="m-2"
                  variant="secondary"
                  size="sm"
                  onClick={onCancelClick}
                >
                  Anuluj
                </Button>
              </Col>
            </Row>
          </Form>
          <Form className="m-2">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nazwa</Form.Label>
              <Form.Control
                type="text"
                onChange={handleChange}
                value={pricelistName}
                isInvalid={error === null ? false : true}
              />
            </Form.Group>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default AddPricelist;
