import React from "react";
import styles from "./CardOverlay.module.css";

function CardOverlay() {
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.spinner}></div>
      </div>
    </>
  );
}
export default CardOverlay;
