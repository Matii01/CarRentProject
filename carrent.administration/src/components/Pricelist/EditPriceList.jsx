import { Button, Card, Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import EditPricelistDate from "./EditPricelistDate";
import { useEffect, useState } from "react";
import EditPricelistItems from "./EditPriceListItems";
import fetchData from "../../functions/fetchData";

function EditPriceList({ priceList, onCancel }) {
  const [newName, setNewName] = useState("");

  useEffect(() => {
    if (priceList) {
      setNewName(priceList.name);
    }
  }, [priceList]);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(newName);
    fetchData(`https://localhost:7091/CarPriceList/update/${priceList.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: { id: priceList.id, name: newName },
    })
      .then((data) => {
        setNewName(data.name);
        console.log("data");
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setNewName(value);
  };

  if (!priceList) {
    return <p>First choose a pricelist</p>;
  }

  return (
    <Card className="p-2">
      <Card.Header>
        <Card.Title as="h5">Cennik - edycja</Card.Title>
      </Card.Header>
      <Card.Body className="table-full-width table-responsive px-0">
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="home" title="Dane">
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
                    onClick={onCancel}
                  >
                    Anuluj
                  </Button>
                </Col>
              </Row>
            </Form>
            <Form className="m-2">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Nazwa</Form.Label>
                <Form.Control
                  type="text"
                  value={newName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Tab>
          <Tab eventKey="profile" title="Daty obowiązywania">
            <EditPricelistDate pricelistId={priceList.id} />
          </Tab>
          <Tab eventKey="contact" title="Pozycje">
            <EditPricelistItems pricelistId={priceList.id} />
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  );
}

export default EditPriceList;
