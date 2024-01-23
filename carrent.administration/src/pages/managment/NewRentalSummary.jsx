import { Button, Card, Col, Row, Form, CardBody } from "react-bootstrap";
import MyTable from "../../components/Table/MyTable";

function NewRentalSummary({ onSubmit, rentalData }) {
  const onSubmitClick = (event) => {
    event.preventDefault();
  };

  const onSaveClick = () => {
    onSubmit();
  };

  const onTest = () => {
    console.log(rentalData);
  };
  return (
    <Card>
      <Card.Header>
        <Button onClick={onTest}>test</Button>
      </Card.Header>
      <Card.Body>
        <Row>
          <Form onSubmit={onSubmitClick}>
            <Row>
              <Col>
                <MyTable
                  ItemId={"CarId"}
                  thead={["ID", "Name", "Price", "Od", "Do"]}
                  item={["CarId", "Name", "Price", "DateFrom", "DateTo"]}
                  items={rentalData.Rentals}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                {rentalData.FirmClientDto && (
                  <FirmClientCard item={rentalData.FirmClientDto} />
                )}
                {rentalData.ClientDetails && (
                  <IndividualClientCard item={rentalData.ClientDetails} />
                )}
              </Col>
              <Col>
                <Card>
                  <CardBody>
                    <Row>
                      <Col>Do zapłaty:</Col>
                      <Col>{rentalData.Invoice.ToPaid}</Col>
                    </Row>
                    <Row>
                      <Col>Zapłacono:</Col>
                      <Col>{rentalData.Invoice.Paid}</Col>
                    </Row>
                    <Row>
                      <Col>Termin płatności:</Col>
                      <Col>{rentalData.Invoice.PaymentTerm}</Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Form>
        </Row>
        <Row className="mt-4">
          <Col>
            <Button variant="dark" size="sm" onClick={onSaveClick}>
              Zapisz
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

function FirmClientCard({ item }) {
  return (
    <Card>
      <CardBody>
        <Row>
          <Col>Nazwa firmy</Col>
          <Col>{item.CompanyName}</Col>
        </Row>
        <Row>
          <Col>Nip:</Col>
          <Col>{item.NIP}</Col>
        </Row>
        <Row>
          <Col>Miasto</Col>
          <Col>{item.City}</Col>
        </Row>
        <Row>
          <Col>Ulica i numer</Col>
          <Col>{item.StreetAndNumber}</Col>
        </Row>
        <Row>
          <Col>Kod pocztowy</Col>
          <Col>{item.PostCode}</Col>
        </Row>
      </CardBody>
    </Card>
  );
}

function IndividualClientCard({ item }) {
  return (
    <Card>
      <CardBody>
        <Row>
          <Col>Imie</Col>
          <Col>{item.FirstName}</Col>
        </Row>
        <Row>
          <Col>Nazwisko</Col>
          <Col>{item.LastName}</Col>
        </Row>
        <Row>
          <Col>Numer telefonu</Col>
          <Col>{item.PhoneNumber}</Col>
        </Row>
        <Row>
          <Col>Adres</Col>
          <Col>{item.Address}</Col>
        </Row>
        <Row>
          <Col>Kod pocztowy</Col>
          <Col>{item.PostCode}</Col>
        </Row>
        <Row>
          <Col>Miasto</Col>
          <Col>{item.City}</Col>
        </Row>
      </CardBody>
    </Card>
  );
}

export default NewRentalSummary;
