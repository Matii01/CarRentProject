import styles from "./Table.module.css";

function TableComponent() {
  return (
    <>
      <table className={`${styles.table}`}>
        <thead>
          <tr>
            <th>Class name</th>
            <th>Type</th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Like a butterfly</td>
            <td>Boxing</td>
            <td>9:00 AM - 11:00 AM</td>
          </tr>
          <tr>
            <td>Mind &amp; Body</td>
            <td>Yoga</td>
            <td>8:00 AM - 9:00 AM</td>
          </tr>
          <tr>
            <td>Crit Cardio</td>
            <td>Gym</td>
            <td>9:00 AM - 10:00 AM</td>
          </tr>
          <tr>
            <td>Wheel Pose Full Posture</td>
            <td>Yoga</td>
            <td>7:00 AM - 8:30 AM</td>
          </tr>
          <tr>
            <td>Playful Dancer's Flow</td>
            <td>Yoga</td>
            <td>8:00 AM - 9:00 AM</td>
          </tr>
          <tr>
            <td>Zumba Dance</td>
            <td>Dance</td>
            <td>5:00 PM - 7:00 PM</td>
          </tr>
          <tr>
            <td>Cardio Blast</td>
            <td>Gym</td>
            <td>5:00 PM - 7:00 PM</td>
          </tr>
          <tr>
            <td>Pilates Reformer</td>
            <td>Gym</td>
            <td>8:00 AM - 9:00 AM</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default TableComponent;
