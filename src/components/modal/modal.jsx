import { useEffect } from "react";
import { createPortal } from "react-dom";
import modalStyles from '../modal/modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import ModalOverlay from "../modal-overlay/modal-overlay";

const Modal = ({ closeModal, children, title }) => {

  const modalRoot = document.getElementById('react-modals');

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    }
  }, [closeModal]);

  return createPortal (
    <>
      <div className={modalStyles.con}>
          <div className={`${modalStyles.text} pt-10 pr-10 pl-10`}>
            <h2 className={'text text_type_main-large'}>{title}</h2>
            <button type="button" className={modalStyles.closeButton} onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}>
              <CloseIcon type="primary" />
            </button>
          </div>
          {children}
        </div>
      <ModalOverlay closeModal={closeModal} />
    </>,modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string,
}

export default Modal;