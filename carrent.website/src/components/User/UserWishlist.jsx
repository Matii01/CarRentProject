import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import axiosInstance from "../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

function UserWishList() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("Wishlist/Wishlist")
      .then((data) => {
        console.log(data);
        setList(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const goToDetails = (id) => {
    console.log("go to details: " + id);
    navigate(`/car/details/${id}`);
  };

  const removeFromList = (id) => {
    axiosInstance
      .delete(`Wishlist/${id}`)
      .then((data) => {
        const newList = list.filter((it) => it.carId != id);
        setList(newList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Card>
        <Card.Header className="cardHeader">Saved for late</Card.Header>
        <Card.Body>
          <Table>
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>Car</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {list.map((it) => (
                <tr key={it.car.id}>
                  <td></td>
                  <td>
                    <img src={it.car.pictureUrl} style={{ maxWidth: 150 }} />
                  </td>
                  <td>{it.car.name}</td>
                  <td>
                    <Button
                      className="w-100"
                      variant="outline-dark"
                      size="sm"
                      onClick={() => removeFromList(it.car.id)}
                    >
                      Remove
                    </Button>
                  </td>
                  <td>
                    <Button
                      className="w-100"
                      variant="outline-dark"
                      size="sm"
                      onClick={() => goToDetails(it.car.id)}
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
    </>
  );
}

export default UserWishList;

/*
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
*/
