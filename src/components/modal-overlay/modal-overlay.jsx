import React from "react";
import PropTypes from "prop-types";

import styles from "./modal-overlay.module.css";

const ModalOverlay = (props) => {
  const overlayRef = React.useRef();

  const handleClick = (e) => {
    if (e.target === overlayRef.current) {
      props.onClose();
    }
  };

  return (
    <div ref={overlayRef} onClick={handleClick} className={styles.overlay}>
      {props.children}
    </div>
  );
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default ModalOverlay;
