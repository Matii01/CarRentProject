import { useEffect, useState } from "react";
import MyTable from "../Table/MyTable";

function MonthReportTable({ data }) {
  const [transformedData, setTransformedData] = useState([]);

  useEffect(() => {
    const transformed = data.map((it, index) => {
      return {
        id: index + 1,
        ...it,
      };
    });
    setTransformedData(transformed);
  }, [data]);

  return (
    <>
      <MyTable
        thead={["Nr", "Rok", "Miesiąc", "Przychód"]}
        items={transformedData}
        item={["id", "year", "month", "amount"]}
      />
    </>
  );
}

export default MonthReportTable;
