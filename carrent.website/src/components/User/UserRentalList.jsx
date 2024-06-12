import { Button, Card, Col, Row, Table } from "react-bootstrap";
import CarPagination from "../Pagination/CarPagination";

function UserRentalList({ items, onDetailsClick, metaData, onPageChange }) {
  const formatDate = (date) => {
    return date.slice(0, 10);
  };

  const goToDetails = (id) => {
    onDetailsClick(id);
  };

  return (
    <Card>
      <Card.Header className="cardHeader">User Orders</Card.Header>
      <Card.Body>
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>Samochów</th>
              <th>Od</th>
              <th>Do</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.carName}</td>
                <td>{formatDate(item.rentalStart)}</td>
                <td>{formatDate(item.rentalEnd)}</td>
                <td>
                  <Button
                    onClick={() => goToDetails(item.id)}
                    className="w-100"
                    variant="outline-dark"
                    size="sm"
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Row>
          <Col className="ms-2">
            <CarPagination
              paginationData={metaData}
              pageChange={onPageChange}
              size="md"
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default UserRentalList;
