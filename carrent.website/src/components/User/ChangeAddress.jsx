import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import axiosInstance from "../../utils/axiosConfig";
import AddressComponent from "./AddressCompanant";

function ChangeAddress() {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axiosInstance.get(`Users/GetUserAddresses`).then((response) => {
      console.log(response);
      setAddresses(response.data);
    });
  };

  const onAdd = () => {
    getData();
  };

  return (
    <>
      {addresses &&
        addresses.map((item, index) => (
          <Row key={index}>
            <Col className="mb-4">
              <AddressComponent address={item} onAdd={onAdd} />
            </Col>
          </Row>
        ))}
      <Row>
        <Col>
          <AddressComponent onAdd={onAdd} />
        </Col>
      </Row>
    </>
  );
}

export default ChangeAddress;
