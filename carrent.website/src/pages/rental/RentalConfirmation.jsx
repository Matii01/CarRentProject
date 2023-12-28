import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function RentalConfirmation() {
  const location = useLocation();
  const rentalId = location.state.paymentId;
  const [rentalData, setRentalData] = useState(null);

  useEffect(() => {
    axios
      .get(`https://localhost:7091/Rental/rentalDetail/${data}`)
      .then((response) => {
        console.log(response);
        setRentalData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container className="text-center">
      <Row className="m-5">
        <Col className="text-center">
          <h2>RENTAL CONFIRMED</h2>
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
      <Row>
        <Col>
          {rentalData && (
            <p>
              Thank you, {rentalData.client.firstName}. Your rental is
              confirmed.
            </p>
          )}
          <p>Rental nr: {rentalId}</p>
        </Col>
      </Row>
      <Row className="mt-5 mb-5">
        <Col>
          <Button className="customButton w-25">View Your Rental</Button>
        </Col>
      </Row>
    </Container>
  );
}
export default RentalConfirmation;

/*carName
: 
"Skoda Fabia IV"
clientName
: 
"Adam Testowy"
dateFrom
: 
"2023-11-05T00:00:00"
dateTo
: 
"2023-11-06T00:00:00"
totalCost
: 
150 */
