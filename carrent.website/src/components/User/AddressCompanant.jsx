import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Form } from "react-bootstrap";
import {
  useAddAddressMutation,
  useUpdateAddressMutation,
} from "../../api/userApi";

function AddressComponent({ address, onAdd }) {
  const deafultData = {
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    isDefault: false,
  };
  const [updateAddress, setUpdatedAddress] = useState(address || deafultData);
  const [update, result] = useUpdateAddressMutation();
  const [addAddress, addResult] = useAddAddressMutation();

  useEffect(() => {
    if (address != undefined) {
      setUpdatedAddress(address);
    }
  }, [address]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (address === undefined) {
      addAddress(updateAddress).then(() => onAdd());
    } else {
      update(updateAddress).then(() => {
        setUpdatedAddress(deafultData);
        onAdd();
      });
    }
  };

  const handleCheckboxChange = (event) => {
    setUpdatedAddress((prevState) => ({
      ...prevState,
      IsDefault: event.target.checked,
    }));
  };

  return (
    <Card>
      <Card.Header className="cardHeader">ADDRESS</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Full name"
                name="firstName"
                onChange={handleChange}
                value={updateAddress.firstName}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last name"
                name="lastName"
                onChange={handleChange}
                value={updateAddress.lastName}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              placeholder="1234 Main St"
              name="address1"
              onChange={handleChange}
              value={updateAddress.address1}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address 2</Form.Label>
            <Form.Control
              placeholder="Apartment, studio, or floor"
              name="address2"
              onChange={handleChange}
              value={updateAddress.address2}
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>City</Form.Label>
              <Form.Control
                name="city"
                onChange={handleChange}
                value={updateAddress.city}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>State</Form.Label>
              <Form.Control
                name="state"
                onChange={handleChange}
                value={updateAddress.state}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Zip</Form.Label>
              <Form.Control
                name="zip"
                onChange={handleChange}
                value={updateAddress.zip}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Is default"
              checked={updateAddress.isDefault}
              onChange={handleCheckboxChange}
            />
          </Form.Group>

          <Button className="customButton" type="submit">
            {address == null ? "Add" : "Update"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddressComponent;
