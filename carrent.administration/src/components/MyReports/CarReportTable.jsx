import { useEffect, useState } from "react";
import MyTable from "../Table/MyTable";

function CarReportTable({ data }) {
  //   const [transformedData, setTransformedData] = useState([]);
  //   useEffect(() => {
  //     const transformed = data.map((it, index) => {
  //       return {
  //         id: index + 1,
  //         ...it,
  //       };
  //     });
  //     setTransformedData(transformed);
  //   }, [data]);

  // public int CarId {  get; set; }
  // public string CarName {  get; set; }
  // public decimal Cost { get; set; }
  // public int RentalCount { get; set; }
  // public int TotalRentalDays {  get; set; }
  // public double AverageRentalDays {  get; set; }

  return (
    <>
      <MyTable
        thead={[
          "Id",
          "Samochód",
          "Przychód",
          "Liczba wypożyczeń",
          "Całkowita liczba dni",
          "Średnia liczba dni",
        ]}
        items={data}
        item={[
          "carId",
          "carName",
          "cost",
          "rentalCount",
          "totalRentalDays",
          "averageRentalDays",
        ]}
        ItemId="carId"
      />
    </>
  );
}

export default CarReportTable;
