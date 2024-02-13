import { useEffect, useState } from "react";
import transformObjectToQueryString from "../../utils/transformObjectToQuery";
import { formatDate } from "../../utils/formDate";
import jwtInterceptor from "../../utils/jwtInterceptor";
import { Button, Card, Col, Row } from "react-bootstrap";
import TableWithPagination from "../../components/Table/TableWithPagination";
import ManageMessage from "../../components/Message/ManageMessage";
import MessageFiltrs from "../../components/Message/MessageFiltrs";

function MessagesPage() {
  const [metaData, setMetaData] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [showFiltrs, setShowFiltrs] = useState(false);
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
    setSelectedItem(null);
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

  const refreshView = (it) => {
    const transformed = {
      ...it,
      createdDate: formatDate(it.createdDate),
      answeredDate: it.answeredDate === null ? "" : formatDate(it.answeredDate),
      isAnswered: it.isAnswered === true ? "tak" : "nie",
      whoAnswerId: it.whoAnswer === null ? " " : it.whoAnswer,
    };
    const transformedList = items.map((item) => {
      if (item.id == transformed.id) {
        return transformed;
      }
      return item;
    });
    setSelectedItem(transformed);
    setItems(transformedList);
  };

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            <Row>
              <Col>Wiadomości</Col>
              <Col className="d-flex justify-content-end">
                {!showFiltrs && (
                  <Button
                    variant="dark"
                    size="sm"
                    onClick={() => setShowFiltrs(true)}
                  >
                    Pokaż filtry
                  </Button>
                )}
                {showFiltrs && (
                  <Button
                    variant="dark"
                    size="sm"
                    onClick={() => setShowFiltrs(false)}
                  >
                    Ukryj filtry
                  </Button>
                )}
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            {showFiltrs && (
              <MessageFiltrs
                onSubmit={getFilteredItems}
                filtrs={filtrs}
                setFiltrs={setFiltrs}
              />
            )}
          </Card.Body>
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
      <Col>
        {selectedItem && (
          <ManageMessage message={selectedItem} onSubmit={refreshView} />
        )}
      </Col>
    </Row>
  );
}

export default MessagesPage;
