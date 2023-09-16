import { useEffect } from "react";
import { createPortal } from "react-dom";
import modalStyles from '../modal/modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import ModalOverlay from "../modal-overlay/modal-overlay";

const Modal = ({ closeModal, children }) => {

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
    <div>
      <ModalOverlay closeModal={closeModal}>
        <div className={modalStyles.con}>
          <div className={modalStyles.text}>
            {/* <h2 className={'text text_type_main-large'}></h2> */}
            <button type="button" className={modalStyles.closeButton} onClick={closeModal}>
              <CloseIcon type="primary" />
            </button>
          </div>
          {children}
        </div>
      </ModalOverlay>
    </div>,modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  // title: PropTypes.string.isRequired,
}

export default Modal;