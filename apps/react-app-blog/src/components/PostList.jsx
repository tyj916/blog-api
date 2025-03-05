import { Link, useNavigate } from 'react-router-dom';
import htmlParse from 'html-react-parser';
import { getTimestamp, getAuthorName } from '../utils';
import PropTypes from 'prop-types';
import styles from '../styles/PostList.module.css';

function Post({data}) {
  const { id, author, title, content, updatedAt } = data;
  const authorName = getAuthorName(author);
  const description = content.length > 50 ? content.slice(0, 20) + '...' : content;
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
        <button 
          className={[styles.linkButton, styles.author].join(' ')} 
          onClick={handleNavigate}
        >{authorName}</button>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{htmlParse(description)}</p>
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