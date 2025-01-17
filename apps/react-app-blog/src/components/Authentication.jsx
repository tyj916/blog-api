import PropTypes from "prop-types";

function AuthenticationForm({type, text}) {
  return (
    <div className="authentication-form-container">
      <h1 className="form-title">{text}</h1>
      <form action={type === 'login' ? '/login' : '/signUp'} method="POST">
        <ul>
          <li>
            <label htmlFor="username">Username</label>
            <input name="username" type="text" id="username" required />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input name="password" type="password" id="password" required />
          </li>
          {
            type === 'signUp' && <>
              <li>
                <label htmlFor="confirm-password">Confirm Password</label>
                <input name="confirmPassword" type="password" id="confirm-password" required />
              </li>
              <li>
                <label htmlFor="display-name">Display Name (optional)</label>
                <input name="displayName" type="password" id="display-name" />
              </li>
            </>
          }
          <li>
            <button type="submit">{type === 'login' ? 'Log In' : 'Sign Up'}</button>
          </li>
        </ul>
      </form>
    </div>
  );
}

AuthenticationForm.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
}

export default AuthenticationForm;