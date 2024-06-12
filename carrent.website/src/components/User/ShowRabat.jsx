import { Card, Row, Col } from "react-bootstrap";
import { formatDate } from "../../utils/formatData";
import { useGetUserRabatsQuery } from "../../api/userApi";

function ShowRabat() {
  const { data: rabats, error, isLoading } = useGetUserRabatsQuery();

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
