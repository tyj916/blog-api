import { Link, useNavigate } from 'react-router-dom';
import { getTimestamp } from '../utils';
import PropTypes from 'prop-types';
import styles from '../styles/PostList.module.css';

function Post({data}) {
  const { id, author, title, content, updatedAt } = data;
  const authorName = author.displayName || author.username;
  const description = content.length > 20 ? content.slice(0, 20) + '...' : content;
  const time = getTimestamp(updatedAt);
  const navigate = useNavigate();

  const handleNavigate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/profile/${author.username}`)
  }

  return (
    <div className={styles.post}>
      <Link to={`/posts/${id}`}>
        <p className={styles.author}>
          <button className={styles.linkButton} onClick={handleNavigate}>{authorName}</button>
        </p>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <p className={styles.time}>{time}</p>
      </Link>
    </div>
  );
}

function PostList({posts}) {
  return (
    <section className={styles.posts}>
      {posts && posts.length > 0 &&
        posts.map((post) => {
          return <Post key={post.id} data={post} />
        })
      }
      {posts && posts.length === 0 && (
        <p>No posts yet.</p>
      )}
    </section>
  );
}

Post.propTypes = {
  data: PropTypes.object,
}

PostList.propTypes = {
  posts: PropTypes.array,
}

export default PostList;