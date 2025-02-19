import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
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
    <>
      <Header />
      <main>
        <div className={styles.container}>
          <h2 className={styles.title}>Latest Posts</h2>
          <PostList posts={posts} />
        </div>
        <div className={styles.container}>
          <h2 className={styles.title}>Most Popular</h2>
          <PostList posts={posts} />
        </div>
        <section className={styles.about}>
          <div className={styles.container}>
            <h2 className={styles.title}>About the Blog</h2>
            <p>Built to learn programming. Optimized to showcase my skill. Nothing shines but it&apos;s a working site. Feel free to play around and even better if you&apos;d create an account and write a blog on this site.</p>
            <p>Built with JavaScript ES6, Node.js, React, PostgreSQL, along with RESTful API, JWT authentication, Prisma ORM, Vite, etc.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Home;