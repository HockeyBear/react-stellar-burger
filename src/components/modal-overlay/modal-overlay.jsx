import modalOverlayStyles from '../modal-overlay/modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ children, closeModal }) => {
  return (
    <div className={modalOverlayStyles.overlay} onClick={closeModal}>{children}</div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default ModalOverlay;