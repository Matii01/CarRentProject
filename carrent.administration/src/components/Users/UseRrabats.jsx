import { useState, useEffect } from "react";
import { Row, Card, Form, Col, Button } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";
import MyTableWithPagination from "../Table/MyTableWithPagination";
import { formatDate } from "../../utils/formDate";

function UserRabats({ userId }) {
  const [rabats, setRabats] = useState();
  const [newUserRabat, setNewUserRabat] = useState({
    UserId: userId,
    Title: "",
    RabatPercentValue: 0,
    DateOfExpiration: "",
  });

  useEffect(() => {
    getUserRabats();
    setNewUserRabat((prev) => ({
      ...prev,
      UserId: userId,
    }));
  }, [userId]);

  const getUserRabats = () => {
    jwtInterceptor
      .get(`rabat/userRabat/${userId}`)
      .then((data) => {
        console.log(data.data);
        transformAndSetData(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const transformAndSetData = (data) => {
    const transformed = data.map((it) => ({
      ...it,
      dateOfExpiration: formatDate(it.dateOfExpiration),
      isUsed: it.isUsed ? "true" : "false",
    }));
    setRabats(transformed);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(newUserRabat);
    jwtInterceptor
      .post(`rabat/addUserRabat`, JSON.stringify(newUserRabat), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        getUserRabats();
        setNewUserRabat((prev) => ({
          UserId: userId,
          Title: "",
          RabatPercentValue: 0,
          DateOfExpiration: "",
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setNewUserRabat((prev) => ({ ...prev, [name]: value }));
  };

  const deleteRabat = (id) => {
    jwtInterceptor
      .delete(`rabat/deleteUserRabat/${id}`)
      .then((data) => {
        console.log(data);
        getUserRabats();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Row>
        <Card style={{ borderColor: "transparent" }}>
          <Form onSubmit={handleSubmit} className="m-2">
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Tytuł</Form.Label>
                <Form.Control
                  type="text"
                  name="Title"
                  value={newUserRabat.Title}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Wartość w %</Form.Label>
                <Form.Control
                  type="number"
                  name="RabatPercentValue"
                  value={newUserRabat.RabatPercentValue}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Data wygaśnięcia</Form.Label>
              <Form.Control
                type="date"
                name="DateOfExpiration"
                value={newUserRabat.DateOfExpiration}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="dark" type="submit">
              Zapisz
            </Button>
          </Form>
        </Card>
      </Row>
      <Row>
        {rabats && (
          <MyTableWithPagination
            thead={["Id", "Wygasa", "wartość", "Użyty", ""]}
            items={rabats}
            item={["id", "dateOfExpiration", "rabatPercentValue", "isUsed"]}
            handleDelete={deleteRabat}
          />
        )}
      </Row>
    </>
  );
}

export default UserRabats;
