import { useEffect, useState } from "react";
import { convertTimestamp, getCurrentUsername } from "../utils";
import styles from '../styles/Dashboard.module.css';

function Dashboard() {
  const [posts, setPosts] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const username = getCurrentUsername();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users/${username}/posts`, {mode: "cors"})
      .then(response => response.json())
      .then(json => {
        setPosts(json.writtenPost);
      })
      .catch(err => {
        console.error(err);
        setErrorMessage("Something went wrong... Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [username]);

  return (
    <>
      <div>
        <h1>Dashboard</h1>
        <h2>Your Posts</h2>
        <section className={styles.postsTable}>
          <div className={[styles.tableRow, styles.tableHead].join(' ')}>
            <p>Title</p>
            <p>Status</p>
            <p>Last Update</p>
            <p></p>
          </div>
          <div className={styles.tableBody}>
            {errorMessage && <p className={styles.tableMessage}>{errorMessage}</p>}
            {loading && <p className={styles.tableMessage}>Loading...</p>}
            {posts && posts.map(post => {
              return (
                <div key={post.id} className={[styles.tableRow, styles.rowItem].join(' ')}>
                  <p><a href={`/posts/${post.id}`}>{post.title}</a></p>
                  <p>{post.status}</p>
                  <p>{convertTimestamp(post.updatedAt)}</p>
                  <p>
                    <button>Edit</button>
                    <button>Delete</button>
                  </p>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </>
  );
}

export default Dashboard;