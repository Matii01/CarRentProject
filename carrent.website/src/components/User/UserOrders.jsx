import { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import axiosInstance from "../../utils/axiosConfig";

function UserOrders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axiosInstance
      .get(`https://localhost:7091/rental/UserRental`)
      .then((data) => {
        console.log(data.data);
        setOrders(data.data);
      });
  }, []);

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
            {orders.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.carName}</td>
                <td>{item.rentalStart}</td>
                <td>{item.rentalEnd}</td>
                <td>Details</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default UserOrders;
