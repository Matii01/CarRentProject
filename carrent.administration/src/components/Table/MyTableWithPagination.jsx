import { Card, Col, Pagination, Row, Form } from "react-bootstrap";
import styles from "./Table.module.css";
import { useEffect, useState } from "react";

function MyTableWithPagination({
  thead,
  items,
  item,
  onDoubleClick,
  handleDelete,
  searchTerm,
  serachBy,
  size,
  onChoose,
}) {
  const [filtered, setFiltered] = useState([]);
  const [pagedList, setPagedList] = useState([]);
  const [onPage, setOnPage] = useState(10);
  const [PageNum, setPageNum] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [hasPrevious, setHasPrevious] = useState(true);

  useEffect(() => {
    try {
      const newList = filtered.filter((e) =>
        e[serachBy].toLowerCase().includes(searchTerm.toLowerCase())
      );
      setPagedList(newList);
    } catch {}
  }, [searchTerm]);

  useEffect(() => {
    setFiltered(items);
  }, [items]);

  useEffect(() => {
    toPagedList();
  }, [onPage, PageNum, filtered]);

  const toPagedList = () => {
    const size = filtered.length;
    const start = (PageNum - 1) * onPage;
    const end = onPage * PageNum;
    const list = filtered.slice(start, end);

    if (end >= size) {
      setHasNext(false);
    } else {
      setHasNext(true);
    }
    if (start > 0) {
      setHasPrevious(true);
    } else {
      setHasPrevious(false);
    }
    //console.log(`${start} ${end}  ${onPage} ${PageNum}`);
    //console.log(list);
    setPagedList(list);
  };

  const onHeaderClick = (headerName, mode) => {
    const name = getItemNameByHeaderName(headerName);
    if (mode === "DESC") {
      const sorted = sortByFieldDesc([...filtered], name);
      setFiltered(sorted);
    } else {
      const sorted = sortByFieldAsc([...filtered], name);
      setFiltered(sorted);
    }
  };

  const getItemNameByHeaderName = (headerName) => {
    const index = thead.indexOf(headerName);
    if (index == -1) {
      return "";
    }
    return item[index];
  };

  const sortByFieldAsc = (array, fieldName) => {
    return array.sort((a, b) => {
      if (a[fieldName] < b[fieldName]) {
        return -1;
      }
      if (a[fieldName] > b[fieldName]) {
        return 1;
      }
      return 0;
    });
  };

  const sortByFieldDesc = (array, fieldName) => {
    return array.sort((a, b) => {
      if (a[fieldName] < b[fieldName]) {
        return 1;
      }
      if (a[fieldName] > b[fieldName]) {
        return -1;
      }
      return 0;
    });
  };

  const handlePageSizeChange = (event) => {
    setOnPage(event.target.value);
  };

  let fontSize = "12px";
  if (size === "sm") {
    fontSize = "10px";
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Row>
            <table className={`${styles.table}`} style={{ fontSize: fontSize }}>
              <thead>
                <tr>
                  {thead.map((header, index) => (
                    <th key={index}>
                      <Row>
                        <Col className="m-1">{header}</Col>
                        <Col>
                          <Row>
                            <i
                              onClick={() => onHeaderClick(header, "ASC")}
                              className="fa-solid fa-caret-up"
                            ></i>
                          </Row>
                          <Row>
                            <i
                              onClick={() => onHeaderClick(header, "DESC")}
                              className="fa-solid fa-caret-down"
                            ></i>
                          </Row>
                        </Col>
                      </Row>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pagedList.map((type) => (
                  <tr key={type.id} onDoubleClick={() => onDoubleClick(type)}>
                    {item.map((it, index) => (
                      <td key={index}>{type[it]}</td>
                    ))}
                    {handleDelete && (
                      <td>
                        <i
                          className="fa-solid fa-trash"
                          onClick={() => handleDelete(type.id)}
                          style={{ cursor: "pointer" }}
                        ></i>
                      </td>
                    )}
                    {onChoose && (
                      <td>
                        <i
                          className="fa-solid fa-plus"
                          onClick={() => onChoose(type)}
                          style={{ cursor: "pointer" }}
                        ></i>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </Row>
          <Row className="mt-4">
            <Col>
              <Form>
                <Form.Select
                  size="sm"
                  onChange={handlePageSizeChange}
                  defaultValue={10}
                >
                  <option value={1}>1</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={filtered.length}>Wszystkie</option>
                </Form.Select>
              </Form>
            </Col>
            <Col>
              <Pagination size="sm">
                {hasPrevious && (
                  <Pagination.Prev onClick={() => setPageNum(PageNum - 1)} />
                )}
                <Pagination.Item>{PageNum}</Pagination.Item>
                {hasNext && (
                  <Pagination.Next onClick={() => setPageNum(PageNum + 1)} />
                )}
              </Pagination>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default MyTableWithPagination;
