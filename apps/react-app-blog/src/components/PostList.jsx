import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTimestamp } from '../utils';
import PropTypes from 'prop-types';

function Post({data}) {
  const { id, author, title, content, updatedAt } = data;
  const authorName = author.displayName || author.username;
  const description = content.length > 20 ? content.slice(0, 20) + '...' : content;
  const time = getTimestamp(updatedAt);

  return (
    <div>
      <Link to={`/posts/${id}`}>
        <p>{authorName}</p>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{time}</p>
      </Link>
    </div>
  );
}

function PostList() {
  const [postList, setPostList] = useState(null);
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
      .then((response) => setPostList(response))
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
      {postList && postList.length > 0 && (
        <div>
          {postList.map((post) => {
            return <Post key={post.id} data={post} />
          })}
        </div>
      )}
      {postList && postList.length === 0 && (
        <p>No posts yet.</p>
      )}
    </div>
  );
}

Post.propTypes = {
  data: PropTypes.object,
}

export default PostList;