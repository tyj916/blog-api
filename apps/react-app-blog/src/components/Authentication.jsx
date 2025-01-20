import PropTypes from "prop-types";
import { createModal } from "../utils";
import { useState } from "react";

function sendLoginRequest(username, password, setMessage, setLoading) {
  fetch('http://localhost:3000/api/login', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
    redirect: 'manual'
  })
  .then((response) => {
    if (response.status >= 500) {
      throw new Error("Something is wrong with the server... Please try again later.");
    }

    return response.json();
  })
  .then((response) => {
    if (response.token) {
      localStorage.setItem('jwt', response.token);
      location.reload();
      return;
    }

    setMessage(response.message);
  })
  .catch(err => {
    console.error(err);
    setMessage(err);
  })
  .finally(() => setLoading(false));
}

function SignUpForm({text}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    fetch('http://localhost:3000/api/register', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        displayName,
      }),
    })
    .then((response) => {
      if (response.status >= 500) {
        throw new Error("Something is wrong with the server... Please try again later.");
      }

      return response.json();
    })
    .then((response) => {
      if (response.username) {
        setMessage(`You are registered! You'll be login automatically in 5 sec...`);

        let count = 5;
        const countdown = setInterval(() => {
          if (count > 0) {
            count--;
            setMessage(`You are registered! You'll be login automatically in ${count} sec...`);
          } else {
            clearInterval(countdown);
            sendLoginRequest(username, password, setMessage, setLoading);
          }
        }, 1000);
        return;
      }
      setMessage(response.message);
    })
    .catch(err => {
      console.error(err);
      setMessage(err);
    })
    .finally(() => setLoading(false));
  }

  return (
    <div className="authentication-form-container">
      <h1 className="form-title">{text}</h1>
      <form onSubmit={handleSubmit} >
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
          <li>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input 
              name="confirmPassword" 
              type="password" 
              id="confirm-password" 
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required 
            />
            {confirmPassword && password !== confirmPassword && <p>Password doesn&apos;t match.</p>}
          </li>
          <li>
            <label htmlFor="display-name">Display Name (optional)</label>
            <input 
              name="displayName" 
              type="text" 
              id="display-name" 
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
            />
          </li>
          {loading && <li><p>Loading...</p></li>}
          {message && <li><p>{message}</p></li>}
          <li>
            <button type="submit">Sign Up</button>
          </li>
          <p>Already have an account? <button onClick={() => createModal(<AuthenticationForm type='login' text='Welcome Back.' />)}>Log In</button></p>
        </ul>
      </form>
    </div>
  );
}

function LoginForm({text}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    sendLoginRequest(username, password, setMessage, setLoading);
  }

  return (
    <div className="authentication-form-container">
      <h1 className="form-title">{text}</h1>
      <form onSubmit={handleSubmit} >
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
          {loading && <li><p>Loading...</p></li>}
          {message && <li><p>{message}</p></li>}
          <li>
            <button type="submit">Log In</button>
          </li>
          <p>No Account? <button onClick={() => createModal(<AuthenticationForm type='signUp' text='Join Us.' />)}>Create One</button></p>
        </ul>
      </form>
    </div>
  );
}

function AuthenticationForm({type, text}) {
  if (type === 'login') {
    return <LoginForm text={text} />
  } else {
    return <SignUpForm text={text} />
  }
}

LoginForm.propTypes = {
  text: PropTypes.string,
}

SignUpForm.propTypes = {
  text: PropTypes.string,
}

AuthenticationForm.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
}

export default AuthenticationForm;