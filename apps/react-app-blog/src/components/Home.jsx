import Header from "./Header";
import Footer from "./Footer";
import PostList from "./PostList";
import styles from '../styles/Home.module.css';

function RecentPosts() {
  return (
    <section className={[styles.recent, styles.postsContainer].join(' ')}>
      <h2 className={styles.title}>Recent Posts</h2>
      <div className={styles.container}>
        <PostList url={`${import.meta.env.VITE_API_URL}/posts/published?limit=8`} />
      </div>
    </section>
  )
}

function Home() {
  return (
    <>
      <Header />
      <main>
        <section className={[styles.starred, styles.postsContainer].join(' ')}>
          <h2 className={styles.title}>Most Popular</h2>
          <div className={styles.container}>
            <PostList url={`${import.meta.env.VITE_API_URL}/posts/published?sortBy=comments`} />
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