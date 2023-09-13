import React from "react";
import modalStyles from '../modal/modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import { createPortal } from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";

const Modal = ({ children, closeModal }) => {
  return createPortal (
    <div className={modalStyles.modal}>
      <ModalOverlay closeModal={closeModal} />
      <div className={modalStyles.con}>
        <button type="button" className={modalStyles.close} closeModal={closeModal}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </div>
  );
};

Modal.PropTypes = {
  children: PropTypes.element.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default Modal;