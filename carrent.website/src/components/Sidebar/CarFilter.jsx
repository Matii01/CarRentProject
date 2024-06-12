import { Form, Button, Container, Accordion, FormCheck } from "react-bootstrap";
import styles from "./CarFilter.module.css";
import { useGetCarSortingInfoQuery } from "../../api/carsApi";

function CarFilter({
  isOpen,
  isGridView,
  closeFilter,
  applayFilterClick,
  filterInfo,
  setFilterInfo,
}) {
  const { data, error, isLoading } = useGetCarSortingInfoQuery();

  const handleSubmit = (event) => {
    event.preventDefault();
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
  };

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div
      className={`${styles.sidebar} ${
        isOpen || !isGridView ? styles.open : ""
      }`}
      style={{ paddingTop: "75px" }}
    >
      <Container className="mb-4">
        <h2 className="text-center mt-4">Filtrs</h2>
        <Button onClick={close} className="start-50 mt-2 mb-4 customButton">
          <i className="fa-solid fa-bars"></i>
        </Button>
        <Form onSubmit={handleSubmit}>
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
          </Form.Group>
          <Form.Group>
            <hr />
            <Accordion>
              <Accordion.Header>Vehicle Equipment</Accordion.Header>
              <Accordion.Body style={{ maxHeight: 200, overflowY: "auto" }}>
                {data &&
                  data.carEquipment &&
                  data.carEquipment.map((type) => (
                    <FormCheck
                      key={type.id}
                      id={type.id}
                      name="CarEquipmentId"
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
