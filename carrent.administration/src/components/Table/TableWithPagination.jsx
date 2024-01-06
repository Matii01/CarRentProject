import { Card, Row, Col, Form } from "react-bootstrap";
import styles from "./Table.module.css";
import { useEffect, useState } from "react";
import TablePagination from "../Pagination/TablePagination";

function TableWithPagination({
  thead,
  items,
  item,
  metaData,
  searchTerm,
  onDoubleClick,
  handleDelete,
  handlePageChange,
  handlePageSizeChange,
}) {
  const [filteredList, setFilteredList] = useState(items);

  useEffect(() => {
    if (searchTerm === null || searchTerm === "") {
      setFilteredList(items);
    } else {
      const filtered = items.filter((e) =>
        e.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredList(filtered);
    }
  }, [searchTerm, items]);

  return (
    <>
      <table className={`${styles.table}`}>
        <thead>
          <tr>
            {thead.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredList.map((type) => (
            <tr key={type.id} onDoubleClick={() => onDoubleClick(type.id)}>
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
            </tr>
          ))}
        </tbody>
      </table>
      <Row className="mt-3 p-1">
        <Col className="d-flex justify-content-start">
          <Form>
            <Form.Select
              size="sm"
              onChange={handlePageSizeChange}
              defaultValue={10}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={metaData.totalCount}>Wszystkie</option>
            </Form.Select>
          </Form>
        </Col>
        <Col className="d-flex justify-content-end">
          <TablePagination
            paginationData={metaData}
            pageChange={handlePageChange}
          />
        </Col>
      </Row>
    </>
  );
}

export default TableWithPagination;
