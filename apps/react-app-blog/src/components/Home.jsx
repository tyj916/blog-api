import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import PostList from "./PostList";
import styles from '../styles/Home.module.css';

function RecentPosts() {
  const [recentPosts, setRecentPosts] = useState();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/posts/published?limit=8`, {mode: 'cors'})
      .then(response => response.json())
      .then(data => setRecentPosts(data))
      .catch(err => console.error(err))
  }, []);

  return (
    <section className={[styles.recent, styles.postsContainer].join(' ')}>
      <h2 className={styles.title}>Recent Posts</h2>
      <div className={styles.container}>
        <PostList posts={recentPosts} />
      </div>
    </section>
  )
}

function Home() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/posts/published?sortBy=popularity`, {mode: 'cors'})
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
        <section className={[styles.starred, styles.postsContainer].join(' ')}>
          <h2 className={styles.title}>Most Popular</h2>
          <div className={styles.container}>
            <PostList posts={posts} />
          </div>
        </section>

        <RecentPosts />

        <section className={styles.about}>
          <div className={styles.container}>
            <h2 className={styles.title}>About the Blog</h2>
            <p>Built to learn programming. Optimized to showcase my skill. Nothing shines but it&apos;s a working site. Feel free to play around and even better if you&apos;d create an account and write a blog on this site.</p>
            <p>Built with JavaScript ES6, Node.js, React, ExpressJS, PostgreSQL, along with RESTful API, JWT authentication, Prisma ORM, Vite, etc.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Home;