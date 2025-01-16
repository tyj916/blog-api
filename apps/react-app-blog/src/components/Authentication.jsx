function AuthenticationForm() {
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
        </ul>
      </form>
    </div>
  );
}

export default AuthenticationForm;