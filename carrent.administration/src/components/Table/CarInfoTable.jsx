import styles from "./Table.module.css";

function CarInfoTable({ thead, makes, onDoubleClick, handleDelete }) {
  return (
    <>
      <table className={`${styles.table}`}>
        <thead>
          <tr>
            {thead.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {makes.map((type) => (
            <tr key={type.id} onDoubleClick={() => onDoubleClick(type)}>
              <td>{type.id}</td>
              <td>{type.name}</td>
              <td>{type.description}</td>
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
    </>
  );
}

export default CarInfoTable;
