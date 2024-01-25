import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";
import { toast } from "react-toastify";
import MyTableWithPagination from "../Table/MyTableWithPagination";

function EditPricelistItems({ pricelistId }) {
  const initialState = {
    priceListId: pricelistId,
    days: "",
    price: "",
    overlimitFee: 0,
  };
  const [items, setItems] = useState();
  const [newItem, setNewItem] = useState(initialState);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    getData();
  }, [pricelistId]);

  const getData = () => {
    jwtInterceptor
      .get(`CarPriceList/${pricelistId}/pricelistItems`)
      .then((data) => {
        setItems(data.data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Bład pobierania");
      });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(newItem);
    if (isEditMode) {
      UpdateSelectedItem();
    } else {
      AddNewItem();
    }
  };

  const AddNewItem = () => {
    jwtInterceptor
      .post(`CarPriceList/addItem`, JSON.stringify(newItem), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        toast.success("Dodano");
        getData();
        setNewItem(initialState);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Błąd");
      });
  };

  const UpdateSelectedItem = () => {
    jwtInterceptor
      .put(
        `CarPriceList/updatePricelistItem/${newItem.id}`,
        JSON.stringify(newItem),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        getData();
        toast.success("Zaktualizowano");
      })
      .catch((error) => {});
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onDelete = (itemId) => {
    console.log("delete " + itemId);
    jwtInterceptor
      .delete(`CarPriceList/deletePricelistItem/${itemId}`)
      .then((data) => {
        getData();
        toast.success("Usunięto");
      })
      .catch((error) => {
        toast.error("Błąd podczas usuwania");
      });
  };

  const handleDoubleClick = (it) => {
    setIsEditMode(true);
    setNewItem(it);
    console.log(it);
  };

  const onCancelClick = () => {
    setIsEditMode(false);
    setNewItem(initialState);
  };

  if (!items) {
    return <p>Loading ...</p>;
  }

  return (
    <>
      <Row>
        <Form className="m-2 pe-4" onSubmit={onSubmit}>
          <Row>
            <Col>
              <Button type="submit" className="m-2" variant="primary" size="sm">
                Zapisz
              </Button>
              <Button
                className="m-2"
                variant="secondary"
                size="sm"
                onClick={onCancelClick}
              >
                Anuluj
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3 h-50">
                <Form.Label style={{ fontSize: ".7rem" }}>
                  Dni wypożyczenia
                </Form.Label>
                <Form.Control
                  className="h-75"
                  type="number"
                  name="days"
                  value={newItem.days}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3 h-50">
                <Form.Label style={{ fontSize: ".7rem" }}>
                  Cena {" (za dzień) "}
                </Form.Label>
                <Form.Control
                  className="h-75"
                  type="number"
                  name="price"
                  value={newItem.price}
                  onChange={handleChange}
                  step={0.01}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3 h-50">
                <Form.Label style={{ fontSize: ".7rem" }}>
                  {"Opłata za przekroczenia limitu (za km)"}
                </Form.Label>
                <Form.Control
                  className="h-75"
                  type="number"
                  name="overlimitFee"
                  value={newItem.overlimitFee}
                  onChange={handleChange}
                  step={0.01}
                />
              </Form.Group>
            </Col>
            <Col></Col>
          </Row>
        </Form>
      </Row>
      <Row>
        <Container>
          <MyTableWithPagination
            thead={["ID", "Dni", "Cena", "Za.prze..", ""]}
            items={items}
            item={["id", "days", "price", "overlimitFee"]}
            size="sm"
            handleDelete={onDelete}
            onDoubleClick={handleDoubleClick}
          />
        </Container>
      </Row>
    </>
  );
}

export default EditPricelistItems;

/**\
 * 
 *  <table
            className={`${styles.table}`}
            style={{
              fontSize: "12px",
            }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Dni</th>
                <th>Cena</th>
                <th>Za przekroczenia</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items &&
                items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.days}</td>
                    <td>{item.price}</td>
                    <td>{item.overlimitFee}</td>
                    <td>
                      <Button size="sm" onClick={() => onDelete(item.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
 */
