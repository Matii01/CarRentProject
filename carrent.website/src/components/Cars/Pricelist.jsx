import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axiosInstance from "../../utils/axiosConfig";

function Pricelist({ id }) {
  const [pricelist, setPricelist] = useState([]);

  // [HttpGet("{carId:int}/PriceList")]
  // CarPriceList
  useEffect(() => {
    //https://localhost:7091/CarPriceList/1/carPricelist
    axiosInstance
      .get(`CarPriceList/${id}/carPricelist`)
      .then((data) => {
        console.log(data);
        setPricelist(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!pricelist) {
    return <>PriceList</>;
  }

  return (
    <>
      <p>Pricelist</p>
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
