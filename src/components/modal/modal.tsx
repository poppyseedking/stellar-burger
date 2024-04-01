import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";

const modalRoot = document.getElementById("react-modals") as Element;

type TModalProps = {
  onClose: () => void;
  title?: string;
  children: React.ReactNode | React.ReactNode[];
  adjustToOrderDetail?: boolean;
};

const Modal = (props: TModalProps) => {
  const handelCloseModal = () => {
    props.onClose();
  };

  const closeByKeyEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      props.onClose();
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", closeByKeyEsc, false);

    return () => {
      document.removeEventListener("keydown", closeByKeyEsc, false);
    };
  });

  return ReactDOM.createPortal(
    <ModalOverlay onClose={props.onClose}>
      <div className={styles.modal}>
        <header className={styles.header}>
          {!props.adjustToOrderDetail ? (
            <h3 className={`text text_type_main-large`}>{props.title}</h3>
          ) : (
            <span></span>
          )}
          <span onClick={handelCloseModal} className="cursor-pointer">
            <CloseIcon type="primary" />
          </span>
        </header>
        <div
          className={`${
            props.adjustToOrderDetail
              ? styles.orderDetailContent
              : styles.content
          }`}
        >
          {props.children}
        </div>
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

export default Modal;
