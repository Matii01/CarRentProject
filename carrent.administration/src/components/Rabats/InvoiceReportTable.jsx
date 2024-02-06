import { useState } from "react";
import MyTable from "../Table/MyTable";

function InvoiceReportTable({ data }) {
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
        thead={[
          "ID",
          "Klient",
          "Zapłacono",
          "Do zapłaty",
          "Data powstania",
          "Data płatności",
        ]}
        items={data}
        item={[
          "id",
          "client",
          "totalPaid",
          "totalToPay",
          "createdDate",
          "paymentDate",
        ]}
      />
    </>
  );
}

export default InvoiceReportTable;
