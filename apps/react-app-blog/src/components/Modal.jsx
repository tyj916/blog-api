import PropTypes from "prop-types";

function Modal({content, closeModal}) {
  return (
    <>
      {content}
      <button type="button" onClick={closeModal}>Close</button>
    </>
  );
}

Modal.propTypes = {
  content: PropTypes.object,
  closeModal: PropTypes.func,
}

export default Modal;