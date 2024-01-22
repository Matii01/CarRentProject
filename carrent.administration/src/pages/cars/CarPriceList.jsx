import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card, Col, Container, Row } from "react-bootstrap";
import AddPricelist from "../../components/Pricelist/AddPricelist";
import EditPriceList from "../../components/Pricelist/EditPriceList";
import MyTableWithPagination from "../../components/Table/MyTableWithPagination";
import jwtInterceptor from "../../utils/jwtInterceptor";
import { ToastContainer, toast } from "react-toastify";

function CarPriceList() {
  const [priceList, setPriceList] = useState();
  const [selectedPricelist, setSelectedPricelist] = useState(null);
  const param = useParams();

  useEffect(() => {
    getPriceLists();
  }, []);

  const getPriceLists = () => {
    jwtInterceptor
      .get(`https://localhost:7091/CarPriceList/${param.carId}/PriceList`)
      .then((data) => {
        setPriceList(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Płąd pobierania");
      });
  };

  const refreshView = () => {
    getPriceLists();
  };

  const onPricelistAdded = () => {
    console.log("nowy cennik dodany ");
    getPriceLists();
  };

  const onChoose = (pricelist) => {
    setSelectedPricelist(pricelist);
  };

  const onCancelClick = () => {
    setSelectedPricelist(null);
  };

  const handleDelete = (id) => {
    console.log(id);
  };

  if (!priceList) {
    return <p>Loading ... </p>;
  }

  return (
    <>
      <ToastContainer />
      <Container style={{ fontSize: "12px" }}>
        <Row>
          <Col md={6}>
            <Card className="" style={{ marginTop: "0px" }}>
              <Card.Header>
                <Row>
                  <Col className="text-center">
                    <p>Cenniki</p>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <MyTableWithPagination
                  thead={["ID", "Nazwa", ""]}
                  items={priceList}
                  item={["id", "name"]}
                  onDoubleClick={onChoose}
                  handleDelete={handleDelete}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            {!selectedPricelist && (
              <AddPricelist carId={param.carId} onAdded={onPricelistAdded} />
            )}
            {selectedPricelist && (
              <EditPriceList
                priceList={selectedPricelist}
                onCancel={onCancelClick}
                onEdit={refreshView}
              />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CarPriceList;

/*
<table
    className={`${styles.table}`}
    style={{ fontSize: "12px" }}
  >
    <thead>
      <tr>
        <th>ID</th>
        <th>Nazwa</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {priceList.map((item) => (
        <tr key={item.id} onDoubleClick={() => onChoose(item)}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>
            <Button size="sm">Delete</Button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
*/
