import { Col, Row } from "react-bootstrap";
import AddressComponent from "./AddressCompanant";
import { useGetAddressesQuery } from "../../api/userApi";

function ChangeAddress() {
  const { data: addresses, error, isLoading, refetch } = useGetAddressesQuery();

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      {addresses &&
        addresses.map((item, index) => (
          <Row key={index}>
            <Col className="mb-4">
              <AddressComponent address={item} onAdd={refetch} />
            </Col>
          </Row>
        ))}
      <Row>
        <Col>
          <AddressComponent onAdd={refetch} />
        </Col>
      </Row>
    </>
  );
}

export default ChangeAddress;
