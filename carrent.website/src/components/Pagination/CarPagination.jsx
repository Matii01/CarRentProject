import { Pagination } from "react-bootstrap";
import styles from "./CarPagination.module.css"; // Import your custom CSS module

function CarPagination({ paginationData, pageChange }) {
  const handleNumClick = (num) => {
    console.log(num);
    pageChange(num);
  };

  return (
    <Pagination size="lg">
      {/* <Pagination.First /> */}
      {paginationData.hasPrevious && (
        <Pagination.Prev
          onClick={() => handleNumClick(paginationData.currentPage - 1)}
        />
      )}
      {Array.from(
        { length: paginationData.totalPages },
        (_, index) => index + 1
      ).map((num) => (
        <Pagination.Item
          style={{ zIndex: 0 }}
          key={num}
          onClick={() => handleNumClick(num)}
          active={num === paginationData.currentPage ? true : false}
        >
          {num}
        </Pagination.Item>
      ))}
      {paginationData.hasNext && (
        <Pagination.Next
          onClick={() => handleNumClick(paginationData.currentPage + 1)}
        />
      )}
      {/* <Pagination.Last /> */}
    </Pagination>
  );
}

export default CarPagination;
/*
<Pagination.Item>{1}</Pagination.Item>
      <Pagination.Ellipsis />

      <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item active>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>
      <Pagination.Item disabled>{14}</Pagination.Item>

      <Pagination.Ellipsis />
      <Pagination.Item>{20}</Pagination.Item>
*/
