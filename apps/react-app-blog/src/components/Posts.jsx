import { useEffect, useState } from 'react';
import { getTimeDifference } from '../utils';

function Post({data}) {
  const { author, title, content, updatedAt } = data;
  const authorName = author.displayName || author.username;
  const time = getTimeDifference(updatedAt);

  return (
    <div>
      <p>{authorName}</p>
      <h3>{title}</h3>
      <p>description</p>
      <p>{time}</p>
    </div>
  );
}

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/posts", {mode: 'cors'})
      .then((response) => response.json())
      .then((response) => setPosts(response))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="posts">
      {!posts && <p>Loading...</p>}
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

export default Posts;