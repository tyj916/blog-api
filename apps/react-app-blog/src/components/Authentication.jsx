import { createRoot } from "react-dom/client";
import PropTypes from "prop-types";

// eslint-disable-next-line react-refresh/only-export-components
function AuthenticationForm({closeForm}) {
  return (
    <div className="log-in-form-container">
      <form action="/login" method="POST">
        <ul>
          <li>
            <label htmlFor="username">Enter your username to login</label>
            <input type="text" id="username" required />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required />
          </li>
          <li>
            <button type="submit">Submit</button>
          </li>
        </ul>
      </form>
      <button type="button" onClick={closeForm}>Close</button>
    </div>
  );
}

function displayAuthenticationModal() {
  const modalContainer = createRoot(document.querySelector("#modal-container"));

  const closeForm = () => {
    modalContainer.render();
  }

  modalContainer.render(<AuthenticationForm closeForm={closeForm}/>);
}

AuthenticationForm.propTypes = {
  closeForm: PropTypes.func,
}

export default displayAuthenticationModal;