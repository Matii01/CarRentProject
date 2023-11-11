import { useEffect, useState } from "react";
import { useParams } from "react-router";
import fetchData from "../../functions/fetchData";
import styles from "./../../components/Table/Table.module.css";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import AddPricelist from "../../components/Pricelist/AddPricelist";
import EditPriceList from "../../components/Pricelist/EditPriceList";

function CarPriceList() {
  const [priceList, setPriceList] = useState();
  const [selectedPricelist, setSelectedPricelist] = useState(null);
  const param = useParams();

  //https://localhost:7091/CarPriceList/1/PriceList
  useEffect(() => {
    fetchData(`https://localhost:7091/CarPriceList/${param.carId}/PriceList`)
      .then((data) => {
        setPriceList(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onPricelistAdded = () => {
    console.log("nowy cennik dodany ");
  };

  const onChoose = (pricelist) => {
    setSelectedPricelist(pricelist);
  };

  const onCancelClick = () => {
    setSelectedPricelist(null);
  };

  if (!priceList) {
    return <p>Loading ... </p>;
  }

  return (
    <>
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
              />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CarPriceList;
