import React, { MouseEvent } from "react";

import styles from "./modal-overlay.module.css";

type TModalOverlayProps = {
  onClose: () => void;
  children: React.ReactNode;
};

const ModalOverlay = (props: TModalOverlayProps) => {
  const overlayRef = React.useRef<HTMLDivElement | null>(null);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
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

export default ModalOverlay;
