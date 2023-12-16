import { Form, Button, Container, Accordion, FormCheck } from "react-bootstrap";
import styles from "./CarFilter.module.css";
import { useEffect, useState } from "react";

function CarFilter({
  isOpen,
  isGridView,
  closeFilter,
  applayFilterClick,
  filterInfo,
  setFilterInfo,
}) {
  const [data, setData] = useState();
  const [priceError, setPriceError] = useState(null);

  useEffect(() => {
    if (filterInfo.PriceMax === null || filterInfo.PriceMin === null) {
      return;
    }
    if (filterInfo.PriceMax < filterInfo.PriceMin) {
      setPriceError("Min price can't exceed Max price");
    } else {
      setPriceError(null);
    }
  }, [filterInfo.PriceMax, filterInfo.PriceMin]);

  useEffect(() => {
    fetch("https://localhost:7091/car/CarSortingInfo")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilterInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    setFilterInfo((prevState) => ({
      ...prevState,
      [name]: parseFloat(value),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (priceError) {
      console.log("Price Error");
      return;
    }
    console.log("applay filterClick");
    applayFilterClick(filterInfo);
  };

  const close = () => {
    closeFilter();
  };

  const handleCheckboxChange = (event) => {
    const { name, id } = event.target;
    let selected = [];
    if (event.target.checked) {
      selected = [...filterInfo[name], id];
    } else {
      selected = filterInfo[name].filter((item) => item !== id);
    }

    setFilterInfo((prevState) => ({
      ...prevState,
      [name]: selected,
    }));
    console.log(id);
    console.log(selected);
  };

  return (
    <div
      className={`${styles.sidebar} ${
        isOpen || !isGridView ? styles.open : ""
      }`}
      style={{ paddingTop: "75px" }}
    >
      <Container className="mb-4">
        {/* Your Sidebar Content Here */}
        <h2 className="text-center mt-4">Filtrs</h2>
        <Button onClick={close} className="start-50 mt-2 mb-4 customButton">
          <i className="fa-solid fa-bars"></i>
        </Button>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 ms-4 me-4">
            {/* <Form.Label>Min Price</Form.Label> */}
            <Form.Control
              type="number"
              placeholder="Enter min price"
              onChange={handlePriceChange}
              name="PriceMin"
              min={0}
            />
          </Form.Group>

          <Form.Group className="mb-3 ms-4 me-4">
            {/* <Form.Label>Max Price</Form.Label> */}
            <Form.Control
              type="number"
              placeholder="Enter max price"
              onChange={handlePriceChange}
              name="PriceMax"
              min={0}
            />
            {priceError && <p className="text-danger">{priceError}</p>}
          </Form.Group>
          <Form.Group>
            <hr />
            <Accordion>
              <Accordion.Header>Make</Accordion.Header>
              <Accordion.Body>
                {data &&
                  data.carMakes &&
                  data.carMakes.map((make) => (
                    <FormCheck
                      key={make.id}
                      id={make.id}
                      name="MakeId"
                      type="checkbox"
                      label={make.name}
                      onChange={handleCheckboxChange}
                    ></FormCheck>
                  ))}
              </Accordion.Body>
            </Accordion>
          </Form.Group>

          <Form.Group>
            <hr />
            <Accordion>
              <Accordion.Header>Gearbox Type</Accordion.Header>
              <Accordion.Body>
                {data &&
                  data.gearboxType &&
                  data.gearboxType.map((type) => (
                    <FormCheck
                      key={type.id}
                      id={type.id}
                      name="GearboxTypeId"
                      type="checkbox"
                      label={type.name}
                      onChange={handleCheckboxChange}
                    ></FormCheck>
                  ))}
              </Accordion.Body>
            </Accordion>
          </Form.Group>

          <Form.Group>
            <hr />
            <Accordion>
              <Accordion.Header>Engine Type</Accordion.Header>
              <Accordion.Body>
                {data &&
                  data.engineType &&
                  data.engineType.map((type) => (
                    <FormCheck
                      key={type.id}
                      id={type.id}
                      name="EngineTypeId"
                      type="checkbox"
                      label={type.name}
                      onChange={handleCheckboxChange}
                    ></FormCheck>
                  ))}
              </Accordion.Body>
            </Accordion>
          </Form.Group>

          <Form.Group>
            <hr />

            <Accordion>
              <Accordion.Header>Body Type</Accordion.Header>
              <Accordion.Body style={{ maxHeight: 200, overflowY: "auto" }}>
                {data &&
                  data.carType &&
                  data.carType.map((type) => (
                    <FormCheck
                      key={type.id}
                      id={type.id}
                      name="CarTypeId"
                      type="checkbox"
                      label={type.name}
                      onChange={handleCheckboxChange}
                    ></FormCheck>
                  ))}
              </Accordion.Body>
            </Accordion>
            <hr />
          </Form.Group>
          <Form.Group className="text-center">
            <Button className="mt-3 customButton ps-4 pe-4 w-75" type="submit">
              Apply Filters
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
}

export default CarFilter;

/*
<Form.Group className="mb-3">
            <Form.Label>Car Type</Form.Label>
            <Form.Select onChange={handleChange} name="CarTypeId">
              {!filterInfo.CarTypeId && <option>Select... </option>}
              {data &&
                data.carType.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
*/
