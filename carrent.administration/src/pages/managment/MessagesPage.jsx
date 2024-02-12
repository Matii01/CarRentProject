import { useEffect, useState } from "react";
import transformObjectToQueryString from "../../utils/transformObjectToQuery";
import { formatDate } from "../../utils/formDate";
import jwtInterceptor from "../../utils/jwtInterceptor";
import { Card, Col, Row } from "react-bootstrap";
import TableWithPagination from "../../components/Table/TableWithPagination";
import ManageMessage from "../../components/Message/ManageMessage";

function MessagesPage() {
  const [metaData, setMetaData] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [filtrs, setFiltrs] = useState({
    PageNumber: 1,
    PageSize: 10,
    Name: "",
    Email: "",
    CreatedStart: "",
    CreatedEnd: "",
    AnsweredStart: "",
    AnsweredEnd: "",
    IsAnswered: "",
  });

  useEffect(() => {
    getFilteredItems();
  }, [filtrs.PageNumber, filtrs.PageSize]);

  const transformDataAndSetItems = (items) => {
    const transformed = items.map((it) => {
      return {
        ...it,
        createdDate: formatDate(it.createdDate),
        answeredDate:
          it.answeredDate === null ? "" : formatDate(it.answeredDate),
        isAnswered: it.isAnswered === true ? "tak" : "nie",
        whoAnswerId: it.whoAnswer === null ? " " : it.whoAnswer,
      };
    });
    setItems(transformed);
  };

  const getFilteredItems = () => {
    const queryString = transformObjectToQueryString(filtrs);
    jwtInterceptor
      .get(`Messages/getMessages?${queryString}`)
      .then((data) => {
        console.log(data);
        transformDataAndSetItems(data.data.items);
        setMetaData(data.data.metaData);
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

  const handleDoubleClick = (id) => {
    const item = items.find((x) => x.id == id);
    setSelectedItem(item);
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>Wiadomości</Card.Header>
          <Card.Body>
            <TableWithPagination
              thead={["ID", "Imie", "Email", "Data dodania", "Odpowiedziano"]}
              items={items}
              searchTerm={""}
              item={["id", "name", "email", "createdDate", "isAnswered"]}
              metaData={metaData}
              onDoubleClick={handleDoubleClick}
              handlePageChange={handlePageChange}
              handlePageSizeChange={handlePageSizeChange}
            />
          </Card.Body>
        </Card>
      </Col>
      <Col>{selectedItem && <ManageMessage message={selectedItem} />}</Col>
    </Row>
  );
}

export default MessagesPage;
