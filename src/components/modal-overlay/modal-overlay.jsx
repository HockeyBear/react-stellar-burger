import React, { useEffect } from 'react';
import modalOverlayStyles from '../modal-overlay/modal-overlay.module.css';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const ModalOverlay = ({ closeModal }) => {

  useEffect(() => {
    document.addEventListener('keydown', handleEsc);
    return(
      document.removeEventListener('keydown', handleEsc)
    )
  }, [handleEsc]);

  const handleEsc = (evt) => {
    if(evt.key === 'Escape') {
      closeModal();
    }
  }

  const modalRoot = document.getElementById('react-modals');

  return createPortal (
    <div className={modalOverlayStyles.overlay} onClick={closeModal}></div>
    ,modalRoot
  );
}

ModalOverlay.PropTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ModalOverlay;