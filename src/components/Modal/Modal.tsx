import { useEffect, type ReactNode } from "react";
import css from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

function Modal({ onClose, children }: ModalProps) {

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
      <div className={css.modal}>{children}</div>
    </div>
  );
}

export default Modal;
