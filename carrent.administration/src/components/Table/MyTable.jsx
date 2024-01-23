import { Card } from "react-bootstrap";
import styles from "./Table.module.css";

function MyTable({
  thead,
  items,
  item,
  handleDelete,
  size,
  onChoose,
  ItemId = "id",
}) {
  let fontSize = "12px";
  if (size === "sm") {
    fontSize = "10px";
  }

  return (
    <>
      <Card>
        <Card.Body>
          <table className={`${styles.table}`} style={{ fontSize: fontSize }}>
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
                  {onChoose && (
                    <td>
                      <i
                        className="fa-solid fa-plus"
                        onClick={() => onChoose(type)}
                        style={{ cursor: "pointer" }}
                      ></i>
                    </td>
                  )}
                  {handleDelete && (
                    <td>
                      <i
                        className="fa-solid fa-trash"
                        onClick={() => handleDelete(type[ItemId])}
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

export default MyTable;
