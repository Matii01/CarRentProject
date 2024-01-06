import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import transformObjectToQueryString from "../../utils/transformObjectToQuery";
import jwtInterceptor from "../../utils/jwtInterceptor";
import TableWithPagination from "../../components/Table/TableWithPagination";

function CarList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [metaData, setMetaData] = useState({});
  const [carList, setCarList] = useState([]);
  const [forFilter, setForFilter] = useState([]);
  const [filtrs, setFiltrs] = useState({
    PageNumber: 1,
    PageSize: 10,
    OrderBy: "",
    Fields: "",
    GearboxTypeId: [],
    ACTypeId: null,
    EngineTypeId: [],
    CarTypeId: [],
    MakeId: [],
    PriceMin: null,
    PriceMax: null,
    MinSeatsNum: null,
  });

  useEffect(() => {
    getFilteredCars();
  }, [filtrs.PageNumber, filtrs.PageSize]);

  useEffect(() => {
    jwtInterceptor
      .get(`car/CarSortingInfo`)
      .then((data) => {
        setForFilter(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getFilteredCars = () => {
    const queryString = transformObjectToQueryString(filtrs);
    jwtInterceptor
      .get(`car/workerCars?${queryString}`)
      .then((data) => {
        setMetaData(data.data.metaData);
        setCarList(data.data.items);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRowDoubleClick = (carId) => {
    console.log(`double click ${carId}`);
    navigate(`/car/details/${carId}`);
  };

  const handlePageChange = (num) => {
    setFiltrs((prev) => ({
      ...prev,
      PageNumber: num,
    }));
  };

  const handlePageSizeChange = (event) => {
    const { value } = event.target;
    setFiltrs((prev) => ({
      ...prev,
      PageSize: value,
    }));
  };

  const hangleSerachChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const handleCheckboxChange = (event) => {
    const { name, id } = event.target;
    let selected = [];
    if (event.target.checked) {
      selected = [...filtrs[name], id];
    } else {
      selected = filtrs[name].filter((item) => item !== id);
    }

    setFiltrs((prevState) => ({
      ...prevState,
      [name]: selected,
    }));
    console.log(id);
    console.log(selected);
  };

  const onFiltrClick = () => {
    getFilteredCars();
  };

  return (
    <>
      <Container>
        <Card>
          <Card.Body>
            <Row>
              <Col xs="auto">
                <Dropdown>
                  <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    Marki
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="pt-2 ps-3">
                    {forFilter.carMakes &&
                      forFilter.carMakes.map((x) => (
                        <Row key={x.id}>
                          <Col className="me-1">
                            <label>{x.name}</label>
                          </Col>
                          <Col>
                            <input
                              id={x.id}
                              title={x.name}
                              type="checkbox"
                              name="MakeId"
                              onChange={handleCheckboxChange}
                            />
                          </Col>
                        </Row>
                      ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col xs="auto">
                <Dropdown>
                  <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    Typy nadwozia
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="pt-2 ps-3">
                    {forFilter.carType &&
                      forFilter.carType.map((x) => (
                        <Row key={x.id}>
                          <Col className="me-1">
                            <label>{x.name}</label>
                          </Col>
                          <Col>
                            <input
                              id={x.id}
                              title={x.name}
                              type="checkbox"
                              name="CarTypeId"
                              onChange={handleCheckboxChange}
                            />
                          </Col>
                        </Row>
                      ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col xs="auto">
                <Dropdown>
                  <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    Silniki
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="pt-2 ps-3">
                    {forFilter.engineType &&
                      forFilter.engineType.map((x) => (
                        <Row key={x.id}>
                          <Col className="me-1">
                            <label>{x.name}</label>
                          </Col>
                          <Col>
                            <input
                              id={x.id}
                              title={x.name}
                              type="checkbox"
                              name="EngineTypeId"
                              onChange={handleCheckboxChange}
                            />
                          </Col>
                        </Row>
                      ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col className="">
                <Dropdown>
                  <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    Skrzynia biegów
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="pt-2 ps-3">
                    {forFilter.gearboxType &&
                      forFilter.gearboxType.map((x) => (
                        <Row key={x.id}>
                          <Col className="me-1">
                            <label>{x.name}</label>
                          </Col>
                          <Col>
                            <input
                              id={x.id}
                              title={x.name}
                              type="checkbox"
                              name="GearboxTypeId"
                              onChange={handleCheckboxChange}
                            />
                          </Col>
                        </Row>
                      ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col className="d-flex justify-content-end">
                <Button variant="dark" onClick={onFiltrClick}>
                  Filtruj
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Row className="p-1 mb-1">
              <Col xl={6}>
                <Form className="d-flex">
                  <Form.Control
                    size="sm"
                    name="serachTerm"
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={hangleSerachChange}
                  />
                </Form>
              </Col>
            </Row>
            <TableWithPagination
              thead={["ID", "Name", "Make", "Engine", "Gearbox", "AC"]}
              items={carList}
              searchTerm={searchTerm}
              item={["id", "name", "make", "engine", "gearbox", "ac"]}
              metaData={metaData}
              onDoubleClick={handleRowDoubleClick}
              handlePageChange={handlePageChange}
              handlePageSizeChange={handlePageSizeChange}
            />
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default CarList;
