import { Card } from "react-bootstrap";
import styles from "./Table.module.css";
import { useEffect, useState } from "react";

function CarInfoTable({
  thead,
  items,
  item,
  searchTerm,
  onDoubleClick,
  handleDelete,
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
      <Card>
        <Card.Body>
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
                <tr key={type.id} onDoubleClick={() => onDoubleClick(type)}>
                  {item.map((it, index) => (
                    <td key={index}>{type[it]}</td>
                  ))}

                  <td>
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => handleDelete(type.id)}
                      style={{ cursor: "pointer" }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card.Body>
      </Card>
    </>
  );
}

export default CarInfoTable;
