import { Button, Card, Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import EditPricelistDate from "./EditPricelistDate";
import { useEffect, useState } from "react";
import EditPricelistItems from "./EditPriceListItems";
import jwtInterceptor from "../../utils/jwtInterceptor";
import { toast } from "react-toastify";

function EditPriceList({ priceList, onCancel, onEdit }) {
  const [newName, setNewName] = useState("");
  const [isDefault, setIsDefault] = useState(priceList.isDefault);

  useEffect(() => {
    if (priceList) {
      setNewName(priceList.name);
      setIsDefault(priceList.isDefault);
    }
  }, [priceList]);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(newName);

    jwtInterceptor
      .put(
        `CarPriceList/update/${priceList.id}`,
        JSON.stringify({ id: priceList.id, name: newName }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        toast.success("Zaktualizowano");
        setNewName(data.data.name);
        onEdit();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Błąd edycja cenników");
      });
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setNewName(value);
  };

  const setAsADefault = () => {
    jwtInterceptor
      .post(`CarPriceList/defaultPriceList/${priceList.id}`)
      .then((data) => {
        toast.success("zapisano zamiany");
        setIsDefault(true);
        onEdit();
      })
      .catch((error) => {
        toast.error("Błąd");
      });
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
                <Col>
                  {isDefault && (
                    <p size="sm" className="m-2">
                      Domyślny
                    </p>
                  )}
                  {!isDefault && (
                    <Button size="sm" className="m-2" onClick={setAsADefault}>
                      Ustawa jako domyślny
                    </Button>
                  )}
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
