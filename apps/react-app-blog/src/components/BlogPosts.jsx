import Heading from "./Heading";
import PostList from "./PostList";
import styles from '../styles/BlogPosts.module.css';

function BlogPosts() {
  return (
    <>
      <Heading 
        title="Blog Posts"
      />
      <div className={styles.container}>
        <PostList url={`${import.meta.env.VITE_API_URL}/posts/published`} />
      </div>
    </>
  )
}

export default BlogPosts;