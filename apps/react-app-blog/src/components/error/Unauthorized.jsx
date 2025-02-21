import { useNavigate } from "react-router-dom";
import styles from '../../styles/index.css';

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <section className={styles.error}>
      <div className={styles.container}>
        <h1>401</h1>
        <h2>Hold up. Authentication required.</h2>
        <p>Try login if you think you have access to it.</p>
        <p>Or turn back to where you came from.</p>
        <button onClick={() => navigate(-1)}>Send Me Back</button>
      </div>
    </section>
  );
}

export default Unauthorized;