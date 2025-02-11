import { useState, useEffect } from "react";
import Heading from "./Heading";
import PostList from "./PostList";
import styles from '../styles/Home.module.css';

function Home() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/posts", {mode: 'cors'})
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Something is wrong with the server... Please try again later.");
        }

        return response.json();
      })
      .then((response) => setPosts(response))
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered. Please try again later.</p>;

  return (
    <div className={styles.home}>
      <Heading title='Posts'/>
      <div className={styles.container}>
        <PostList posts={posts} />
      </div>
    </div>
  )
}

export default Home;