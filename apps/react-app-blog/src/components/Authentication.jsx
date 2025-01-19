import PropTypes from "prop-types";
import { createModal } from "../utils";
import { useState } from "react";

function AuthenticationForm({type, text}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/api/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      })
    })
    .then((response) => {
      if (response.status >= 400) {
        throw new Error("Something is wrong with the server... Please try again later.");
      }

      return response.json();
    })
    .then((response) => {
      console.log(response);
      if (response.token) {
        localStorage.setItem('jwt', response.token);
      }
    })
    .catch(err => console.error(err));
  }

  return (
    <div className="authentication-form-container">
      <h1 className="form-title">{text}</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          <li>
            <label htmlFor="username">Username</label>
            <input 
              name="username" 
              type="text" 
              id="username" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              required 
            />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input 
              name="password" 
              type="password" 
              id="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required 
            />
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
          {
            type === 'login' ? <p>No Account? <button onClick={() => createModal(<AuthenticationForm type='signUp' text='Join Us.' />)}>Create One</button></p>
              : <p>Already have an account? <button onClick={() => createModal(<AuthenticationForm type='login' text='Welcome Back.' />)}>Log In</button></p>
          }
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