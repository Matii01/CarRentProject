import { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import jwtInterceptor from "../../utils/jwtInterceptor";
import transformObjectToQueryString from "../../utils/transformObjectToQuery";
import TableWithPagination from "../../components/Table/TableWithPagination";
import ManageOpinion from "../../components/Opinion/ManageOpinion";
import { formatDate } from "../../utils/formDate";
import { ToastContainer } from "react-toastify";

function Opinion() {
  const [metaData, setMetaData] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [filtrs, setFiltrs] = useState({
    PageNumber: 1,
    PageSize: 10,
    CarId: "",
    UserId: "",
    IsAccepted: "",
    DateFrom: "",
    DateTo: "",
  });

  useEffect(() => {
    getFilteredItems();
  }, [filtrs.PageNumber, filtrs.PageSize]);

  const transformDataAndSetItems = (items) => {
    const transformed = items.map((it) => {
      return {
        ...it,
        addedDate: formatDate(it.addedDate),
      };
    });
    setItems(transformed);
  };

  const getFilteredItems = () => {
    const queryString = transformObjectToQueryString(filtrs);
    jwtInterceptor
      .get(`CarOpinion/all?${queryString}`)
      .then((data) => {
        setMetaData(data.data.metaData);
        transformDataAndSetItems(data.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
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

  const handleRowDoubleClick = (id) => {
    const item = items.find((x) => x.id == id);
    setSelectedItem(item);
  };

  const onOpinionChange = (id, value) => {
    const newList = items.map((it) => {
      if (it.id == id) {
        const elem = { ...it, isAccepted: value };
        setSelectedItem(elem);
        return elem;
      }
      return it;
    });
    console.log("list updatead");
    console.log(newList);
    setItems(newList);
  };

  const onOpinionDelete = (id) => {
    const newList = items.filter((it) => it.id != id);
    setSelectedItem(null);
    setItems(newList);
  };

  return (
    <>
      <ToastContainer />
      <Row>
        <Col>
          <Card>
            <Card.Header></Card.Header>
            <Card.Body>
              <TableWithPagination
                thead={["ID", "Tytuł", "Ocena", "Data dodania"]}
                items={items}
                searchTerm={""}
                item={["id", "title", "mark", "addedDate"]}
                metaData={metaData}
                onDoubleClick={handleRowDoubleClick}
                handlePageChange={handlePageChange}
                handlePageSizeChange={handlePageSizeChange}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col>
          {selectedItem && (
            <ManageOpinion
              onChange={onOpinionChange}
              onDelete={onOpinionDelete}
              opinion={selectedItem}
            />
          )}
        </Col>
      </Row>
    </>
  );
}

export default Opinion;
