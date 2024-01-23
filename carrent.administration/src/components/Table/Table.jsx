import { Card } from "react-bootstrap";
import styles from "./Table.module.css";

function TableComponent({ thead, items, item, handleDelete }) {
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
              {items.map((type, key) => (
                <tr key={key}>
                  {item.map((it, index) => (
                    <td key={index}>{type[it]}</td>
                  ))}
                  {handleDelete && (
                    <td>
                      <i
                        className="fa-solid fa-trash"
                        onClick={() => handleDelete(type.id)}
                        style={{ cursor: "pointer" }}
                      ></i>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </Card.Body>
      </Card>
    </>
  );
}

export default TableComponent;
