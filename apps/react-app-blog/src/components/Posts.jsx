import { useEffect, useState } from 'react';
import { getTimeDifference } from '../utils';
import PropTypes from 'prop-types';

function Post({data}) {
  const { author, title, content, updatedAt } = data;
  const authorName = author.displayName || author.username;
  const description = content.length > 20 ? content.slice(0, 20) + '...' : content;
  const time = getTimeDifference(updatedAt);

  return (
    <div>
      <p>{authorName}</p>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{time}</p>
    </div>
  );
}

function Posts() {
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
    <div className="posts">
      {posts && posts.length > 0 && (
        <div>
          {posts.map((post) => {
            return <Post key={post.id} data={post} />
          })}
        </div>
      )}
      {posts && posts.length === 0 && (
        <p>No posts yet.</p>
      )}
    </div>
  );
}

Post.propTypes = {
  data: PropTypes.object,
}

export default Posts;