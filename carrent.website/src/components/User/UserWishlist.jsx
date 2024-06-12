import { Button, Card, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  useGetUserWithlistQuery,
  useRemoveFromWishlistMutation,
} from "../../api/userApi";
import CardOverlay from "../Overlay/CardOverlay";

function UserWishList() {
  const navigate = useNavigate();
  const [removeFromWithlist, result] = useRemoveFromWishlistMutation();
  const { data: list, error, isLoading, refetch } = useGetUserWithlistQuery();

  const goToDetails = (id) => {
    console.log("go to details: " + id);
    navigate(`/car/details/${id}`);
  };

  const removeFromList = async (id) => {
    await removeFromWithlist(id);
  };

  if (isLoading) {
    return (
      <Card className="h-100">
        <CardOverlay />
      </Card>
    );
  }

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
