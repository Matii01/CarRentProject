import { Table } from "react-bootstrap";
import { useGetCarPricelistQuery } from "../../api/carsApi";

function Pricelist({ id }) {
  const { data: pricelist, error, isLoading } = useGetCarPricelistQuery(id);

  if (isLoading) {
    return <>Loading</>;
  }

  if (!pricelist) {
    return <>PriceList</>;
  }

  return (
    <>
      <h5>Pricelist</h5>
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>Liczba Dni</th>
            <th>Cena</th>
          </tr>
        </thead>
        <tbody>
          {pricelist.map((item) => (
            <tr key={item.id}>
              <td>{item.days}</td>
              <td>{item.price * item.days} zł</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Pricelist;
