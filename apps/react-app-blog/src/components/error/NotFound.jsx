import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <section>
      <h1>404</h1>
      <h2>Sorry we couldn&apos;t find that page</h2>
      <p>We don&apos;t know how you ended up here, but let the portal magic send you back to where you came from</p>
      <button onClick={() => navigate(-1)}>Send Me Back</button>
    </section>
  );
}

export default NotFound;