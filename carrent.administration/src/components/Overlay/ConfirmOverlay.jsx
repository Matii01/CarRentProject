import React from "react";
import styles from "./ConfirmOverlay.module.css";

function ConfirmOverlay({ children }) {
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.children}>{children}</div>
      </div>
    </>
  );
}
export default ConfirmOverlay;
