import React from "react";
import styles from "./index.module.scss";

const Modal = ({ children, onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {children}
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
