import { createRoot } from 'react-dom/client';
import Modal from '../components/Modal';

function createModal(content) {
  const closeModal = () => {
    window.modalRoot.render();
  }

  if (!window.modalRoot) {
    window.modalRoot = createRoot(document.querySelector("#modal-container"));
  }

  window.modalRoot.render(<Modal content={content} closeModal={closeModal} />);
}

export default createModal;