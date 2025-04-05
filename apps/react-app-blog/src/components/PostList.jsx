import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import htmlParse from 'html-react-parser';
import { getTimestamp, getAuthorName } from '../utils';
import PropTypes from 'prop-types';
import styles from '../styles/PostList.module.css';

function Post({data}) {
  const { id, author, title, content, updatedAt } = data;
  const authorName = getAuthorName(author);
  const description = content.length > 100 ? content.slice(0, 100) + '...' : content;
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
        <div className={styles.description}>{htmlParse(description)}</div>
        <p className={styles.time}>{time}</p>
      </Link>
    </div>
  );
}

function PostList({url}) {
  const [posts, setPosts] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url, {mode: 'cors'})
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Something is wrong with the server... Please try again later.");
        }

        return response.json();
      })
      .then((data) => setPosts(data))
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [url]);

  if (loading) return <p>Loading... It may take up to 1 min because I am using free account on my backend service provider.</p>
  if (error) return <p>A network error was encountered. Please try again later.</p>

  return (
    <section className={styles.posts}>
      {posts && posts.length > 0
        ? posts.map((post) => {
          return <Post key={post.id} data={post} />
        })
        : <p>No posts yet.</p>
      }
    </section>
  );
}

Post.propTypes = {
  data: PropTypes.object,
}

PostList.propTypes = {
  url: PropTypes.string,
}

export default PostList;