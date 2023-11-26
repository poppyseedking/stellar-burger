import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import styles from "./modal.module.css";

const modalRoot = document.getElementById("react-modals");

const Modal = (props) => {
  const handelCloseModal = () => {
    props.onClose();
  };

  const closeByKeyEsc = () => {
    props.onClose();
  };

  React.useEffect(() => {
    document.addEventListener("keydown", closeByKeyEsc, false);

    return () => {
      document.removeEventListener("keydown", closeByKeyEsc, false);
    };
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay onClose={props.onClose}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <h3 className={`text text_type_main-large`}>{props.title}</h3>
          <span onClick={handelCloseModal} className="cursor-pointer">
            <CloseIcon type="primary" />
          </span>
        </header>
        <div className={styles.content}>{props.children}</div>
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Modal;
