import { Pagination } from "react-bootstrap";

function TablePagination({ paginationData, pageChange }) {
  const handleNumClick = (num) => {
    console.log(num);
    pageChange(num);
  };
  return (
    <Pagination size="sm">
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
    </Pagination>
  );
}
export default TablePagination;
