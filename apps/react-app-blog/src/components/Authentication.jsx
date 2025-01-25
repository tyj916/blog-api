import PropTypes from "prop-types";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUpForm({text}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    .then((response) => response.json())
    .then((data) => {
      if (data.username) {
        let count = 5;
        const countdown = setInterval(() => {
          if (count >= 0) {
            setMessage(`You are registered! You'll be login automatically in ${count} sec...`);
            count--;
          } else {
            clearInterval(countdown);
            return fetch('http://localhost:3000/api/login', {
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
            .then((response) => response.json())
            .then((data) => {
              if (data.token) {
                const { userId, username, token } = data;
                localStorage.setItem('jwt', JSON.stringify({
                  userId,
                  username,
                  token,
                  timestamp: new Date(),
                }));
                navigate('/');
              }
            })
            .catch(err => console.error(err));
          }
        }, 1000);
      } else {
        setMessage(data.message);
      }
    })
    .catch(err => console.error(err))
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
          <p>Already have an account? <Link to='/login'>Log In</Link></p>
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
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

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
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          const { userId, username, token } = data;
          localStorage.setItem('jwt', JSON.stringify({
            userId,
            username,
            token,
            timestamp: new Date(),
          }));
          navigate('/');
        }
    
        setMessage(data.message);
      })
      .catch(err => console.error(err))
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
          {loading && <li><p>Loading...</p></li>}
          {message && <li><p>{message}</p></li>}
          <li>
            <button type="submit">Log In</button>
          </li>
          <p>No Account? <Link to='/register'>Create One</Link></p>
        </ul>
      </form>
    </div>
  );
}

function AuthenticationForm({type = 'login', text = 'Welcome Back.'}) {
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