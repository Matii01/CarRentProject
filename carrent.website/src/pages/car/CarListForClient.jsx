import { Form, Button, Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CarCard from "../../components/Cards/Cars/CarCard";
import { useEffect, useState } from "react";
import CarFilter from "../../components/Sidebar/CarFilter";
import CarPagination from "../../components/Pagination/CarPagination";
import CarsGridView from "../../components/Cars/CarsGridView";
import CarsListView from "../../components/Cars/CarsListView";
import transformObjectToQueryString from "../../utils/transformObjectToQuery";
import axiosInstance from "./../../utils/axiosConfig";
import { useSelector } from "react-redux";

function CarListForClient() {
  const user = useSelector((state) => state.user);
  const defaultParams = { PageNumber: 1, PageSize: 10 };
  const [metaData, setMetaData] = useState();
  const [cars, setCars] = useState();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  const [userWishList, setUserWishList] = useState([]);
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
    CarEquipmentId: [],
    PriceMin: null,
    PriceMax: null,
    MinSeatsNum: null,
  });

  useEffect(() => {
    getFilteredCars(defaultParams);
  }, []);

  useEffect(() => {
    getClientWishList();
  }, [user.isLogin]);

  useEffect(() => {
    getFilteredCars(filterInfo);
  }, [filterInfo.PageNumber, filterInfo.PageSize]);

  const getFilteredCars = () => {
    const queryString = transformObjectToQueryString(filterInfo);
    axiosInstance
      .get(`/car/cars?${queryString}`)
      .then((data) => {
        setCars(data.data.items);
        setMetaData(data.data.metaData);
      })
      .catch((error) => {
        console.log(error);
        setCars(null);
      });
  };

  const getClientWishList = () => {
    if (user.isLogin) {
      axiosInstance
        .get("/Wishlist")
        .then((data) => {
          setUserWishList(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("user is not login");
    }
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
            {/* <Col md={2}>
              <Form.Group>
                <Form.Label>Other info</Form.Label>
                <Form.Select>
                  <option value={2}>2</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </Form.Select>
              </Form.Group>
            </Col> */}
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
        {cars && isGridView && (
          <CarsGridView
            cars={cars}
            isLogin={user.isLogin}
            wishlist={userWishList}
          />
        )}
        {cars && !isGridView && (
          <>
            <Container>
              <Row>
                <div style={{ width: 350 }}></div>
                <Col>
                  <CarsListView
                    cars={cars}
                    isLogin={user.isLogin}
                    wishlist={userWishList}
                  />
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
