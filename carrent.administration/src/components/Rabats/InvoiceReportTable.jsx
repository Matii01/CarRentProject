import MyTable from "../Table/MyTable";

function InvoiceReportTable({ data }) {
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
