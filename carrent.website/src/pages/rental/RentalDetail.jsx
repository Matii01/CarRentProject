import axiosInstance from "./../../utils/axiosConfig";
import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RentalData from "../../components/Rental/RentalData";

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { updateLoading } from "../../features/loading/loadingSlice";

function RentalDetail() {
  const param = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const [allRentalData, setAllRentalData] = useState({
    NewRentalForClient: {
      CarId: param.carId,
      DateFrom: from,
      DateTo: to,
    },
    ClientDetails: {
      FirstName: "",
      LastName: "",
      Email: "",
      PhoneNumber: "",
      Address: "",
      PostCode: "",
      City: "",
    },
    Invoice: {
      Number: "zxcvbnm",
      Comment: "brak uwag",
    },
  });

  ///
  const stripe = useStripe();
  const elements = useElements();
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const dispatch = useDispatch();
  ///

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(
      updateLoading({
        isLoading: true,
      })
    );

    if (!stripe || !elements) {
      console.log("stripe or element");
      return;
    }

    const cardElemet = elements.getElement(CardElement);

    try {
      const response = await axiosInstance.post(
        `https://localhost:7091/Payment/NewPayment`,
        JSON.stringify(allRentalData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const clientSecret = response.data.clientSecret;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElemet,
        },
      });

      if (result.error) {
        setError(result.error.message);
        console.log(result.error.message);
      } else {
        setPaymentIntentId(result.paymentIntent.id);
        navigate("/car/reservation/confirm", {
          state: { paymentId: result.paymentIntent.id },
        });
      }
    } catch (error) {
      console.log("Error", error);
      setError("Payment failed");
    } finally {
      dispatch(
        updateLoading({
          isLoading: false,
        })
      );
    }
  };

  return (
    <>
      <Container>
        <Row className="m-5">
          <h2 className="text-center">Rezerwacja</h2>
        </Row>
        <Form onSubmit={handleSubmit}>
          <Row>
            <RentalData
              allRentalData={allRentalData}
              setAllRentalData={setAllRentalData}
            />
            <Col lg={4}>
              <Card className="m-2">
                <Card.Body>
                  <Card.Title>Płatność</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Card Subtitle
                  </Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Row>
                    <Col>
                      <CardElement />
                      {paymentIntentId && (
                        <div>Payment Successful: {paymentIntentId}</div>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center mt-2">
                      <Button className="w-75 customButton" type="submit">
                        Zapłać online
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}

export default RentalDetail;

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: "400",
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#87BBFD00",
      },
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#FFC7EE",
    },
  },
};
