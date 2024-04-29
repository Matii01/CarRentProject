import { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import axiosInstance from "../../utils/axiosConfig";
import { formatDate } from "../../utils/formatData";

function ShowRabat() {
  const [rabats, setRabats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axiosInstance
      .get(`Rabat/myRabats`)
      .then((data) => {
        console.log(data.data);
        setRabats(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Card>
      <Card.Header className="cardHeader">
        <Row>
          <Col>Discount</Col>
          <Col className="d-flex justify-content-end"></Col>
        </Row>
      </Card.Header>
      <Card.Body>
        {isLoading && <p>Loading ... </p>}
        {!isLoading && rabats.length > 0 && (
          <>
            <p>You have a {rabats[0].rabatPercentValue}% discount </p>
            <p>
              The discount is valid to {formatDate(rabats[0].dateOfExpiration)}
            </p>
          </>
        )}
        {!isLoading && rabats.length === 0 && (
          <p>You have no active discounts </p>
        )}
      </Card.Body>
      <Row></Row>
    </Card>
  );
}

export default ShowRabat;
