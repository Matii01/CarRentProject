import { Form, Button, Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CarCard from "../../components/Cards/Cars/CarCard";
import { useEffect, useState } from "react";
import CarFilter from "../../components/Sidebar/CarFilter";
import CarPagination from "../../components/Pagination/CarPagination";
import CarsGridView from "../../components/Cars/CarsGridView";
import CarsListView from "../../components/Cars/CarsListView";

function CarListForClient() {
  const defaultParams = { PageNumber: 1, PageSize: 10 };
  const [metaData, setMetaData] = useState();
  const [cars, setCars] = useState();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  const [filterInfo, setFilterInfo] = useState({
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
    getFilteredCars(defaultParams);
  }, []);

  useEffect(() => {
    getFilteredCars(filterInfo);
  }, [filterInfo.PageNumber, filterInfo.PageSize]);

  const transformObjectToQueryString = (object) => {
    const obectToString = Object.entries(object)
      .map(([key, value]) => {
        if (key !== null && value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            return value.map((x) => `${key}=${x}&`).join("");
          } else {
            return `${key}=${value}&`;
          }
        }
        return "";
      })
      .join("");
    return obectToString.slice(0, obectToString.length - 1);
  };

  const getFilteredCars = (parameters) => {
    const filteredParams = Object.keys(parameters).reduce((acc, key) => {
      if (parameters[key] !== null && parameters[key] !== undefined) {
        acc[key] = parameters[key];
      }
      return acc;
    }, {});
    //const queryString = new URLSearchParams(filteredParams).toString();

    const queryString = transformObjectToQueryString(filterInfo);

    fetch(`https://localhost:7091/car/cars?${queryString}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("An Error");
        }
        return response.json();
      })
      .then((data) => {
        setCars(data.items);
        setMetaData(data.metaData);
        console.log("data");
        console.log(data.metaData);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        setCars(null);
      });
  };

  const closeFilters = () => {
    setIsFilterOpen(false);
  };

  const closeIfIsOpen = () => {
    if (isFilterOpen) {
      setIsFilterOpen(false);
    }
  };

  const filterClick = (params) => {
    getFilteredCars(params);
  };

  const onPageChange = (pageNumber) => {
    console.log("change page");
    setFilterInfo((prevState) => ({
      ...prevState,
      PageNumber: pageNumber,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilterInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleFilter = () => {
    console.log("click");
    setIsFilterOpen(!isFilterOpen);
  };

  const toggleView = (event) => {
    if (event.target.value === "Grid") {
      setIsGridView(true);
    } else {
      setIsGridView(false);
    }
  };

  return (
    <>
      <Container className="pt-5" onClick={closeIfIsOpen}>
        <Form>
          <hr />
          <Row className="mb-5">
            <Col md={6}>
              <Button
                className="start-50 customButton mt-4"
                onClick={toggleFilter}
              >
                <i className="fa-solid fa-bars"></i>
              </Button>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label>On Page</Form.Label>
                <Form.Select
                  onChange={handleChange}
                  name="PageSize"
                  defaultValue={10}
                >
                  <option value={2}>2</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label>Other info</Form.Label>
                <Form.Select>
                  <option value={2}>2</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label>View</Form.Label>
                <Form.Select onChange={toggleView}>
                  <option value="Grid">Grid</option>
                  <option value="List">List</option>
                </Form.Select>
              </Form.Group>
              {/* <Button className="customButton" onClick={toggleView}>
                Toggle view
              </Button> */}
            </Col>
            <hr className="mt-4" />
          </Row>
        </Form>
        {cars && isGridView && <CarsGridView cars={cars} />}
        {cars && !isGridView && (
          <>
            <Container>
              <Row>
                <div style={{ width: 350 }}></div>
                <Col>
                  <CarsListView cars={cars} />
                </Col>
              </Row>
            </Container>
          </>
        )}
        {metaData && (
          <Row className="p-4 mt-3 mx-auto">
            <Col className="d-flex justify-content-center">
              <CarPagination
                paginationData={metaData}
                pageChange={onPageChange}
              />
            </Col>
          </Row>
        )}
      </Container>
      <CarFilter
        isOpen={isFilterOpen}
        isGridView={isGridView}
        closeFilter={closeFilters}
        applayFilterClick={filterClick}
        filterInfo={filterInfo}
        setFilterInfo={setFilterInfo}
      />
    </>
  );
}

export default CarListForClient;
