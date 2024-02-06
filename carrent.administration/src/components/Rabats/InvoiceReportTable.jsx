import { useEffect, useState } from "react";
import MyTable from "../Table/MyTable";
import { formatDate } from "../../utils/formDate";

function InvoiceReportTable({ data }) {
  const [transformedData, setTransformedData] = useState([]);
  useEffect(() => {
    const transformed = data.map((it) => {
      return {
        ...it,
        createdDate: formatDate(it.createdDate),
        paymentDate: formatDate(it.paymentDate),
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
        items={transformedData}
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
