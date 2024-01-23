import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import GetClientDataForRental from "./GetClientDataForRental";
import { useState } from "react";
import ChooseCarForNewRental from "./ChooseCarForNewRental";
import NewRentalSummary from "./NewRentalSummary";
import jwtInterceptor from "../../utils/jwtInterceptor";
import NewRentalInvoiceData from "./NewRentlaInvoiceData";
import { ToastContainer } from "react-toastify";

function NewRental() {
  const ChooseCLient = "CHOOSECLIENT";
  const ChooseDateAndCars = "CHOOSEDATEANDCARS";
  const PaymentInfo = "PAYMENTINFO";
  const Summary = "SUMMARY";

  const [allRentalData, setAllRentalData] = useState({});
  const [step, setStep] = useState(ChooseCLient);
  const navigate = useNavigate();

  const goToRentals = () => {
    navigate("/rentals");
  };

  const changeView = (view) => {
    setStep(view);
  };

  const onGoToChooseCar = (clientDetails, clientType) => {
    if (clientType === "Individual") {
      setAllRentalData((prev) => ({
        ...prev,
        ClientDetails: clientDetails,
      }));
    } else if (clientType === "Firm") {
      setAllRentalData((prev) => ({
        ...prev,
        FirmClientDto: clientDetails,
      }));
    }
    console.log(clientDetails);
    changeView(ChooseDateAndCars);
  };

  const onGoToPaymentInfo = (rental) => {
    setAllRentalData((prev) => ({
      ...prev,
      Rentals: rental,
    }));
    console.log(rental);
    changeView(PaymentInfo);
  };

  const onGoToSummary = (invoiceData) => {
    setAllRentalData((prev) => ({
      ...prev,
      Invoice: invoiceData,
    }));
    console.log(invoiceData);
    changeView(Summary);
  };

  const addNewRental = () => {
    console.log(allRentalData);
    jwtInterceptor
      .post(`Rental/createNewRental`, JSON.stringify(allRentalData), {
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

  return (
    <>
      <ToastContainer />
      <Container>
        <Row className="d-flex justify-content-center">
          <Col xl={9}>
            <Button variant="dark" size="sm" onClick={goToRentals}>
              Wszystkie zamówienia
            </Button>
          </Col>
        </Row>
        <Row className="mt-2 d-flex justify-content-center">
          <Col xl={9}>
            {step == ChooseCLient && (
              <GetClientDataForRental onNext={onGoToChooseCar} />
            )}
            {step == ChooseDateAndCars && (
              <ChooseCarForNewRental onNext={onGoToPaymentInfo} />
            )}
            {step == PaymentInfo && (
              <NewRentalInvoiceData onSubmit={onGoToSummary} />
            )}
            {step == Summary && (
              <NewRentalSummary
                onSubmit={addNewRental}
                rentalData={allRentalData}
              />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default NewRental;

/*
 <Row className="d-flex justify-content-center">
        <Col xl={9}>
          <Row>
            <Col>
              <Button
                variant="dark"
                size="sm"
                className="w-100"
                onClick={onBack}
              >
                Powrót
              </Button>
            </Col>
            <Col>
              <Button
                variant="dark"
                size="sm"
                className="w-100"
                onClick={onNext}
              >
                Dalej
              </Button>
            </Col>
          </Row>
        </Col>
      </Row> 
*/
