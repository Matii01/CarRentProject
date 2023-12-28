import { Button, Card, Table } from "react-bootstrap";
import CardOverlay from "../Overlay/CardOverlay";

function UserRentalList({ items, onDetailsClick, hidden, isLoading }) {
  const formatDate = (date) => {
    return date.slice(0, 10);
  };

  const goToDetails = (id) => {
    console.log(id);
    onDetailsClick(id);
  };

  return (
    <Card hidden={hidden && !isLoading}>
      {isLoading && <CardOverlay />}
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
            {!isLoading &&
              items.map((item) => (
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
      </Card.Body>
    </Card>
  );
}

export default UserRentalList;
