import { Link, useNavigate } from 'react-router-dom';
import { getTimestamp } from '../utils';
import PropTypes from 'prop-types';

function Post({data}) {
  const navigate = useNavigate();
  const { id, author, title, content, updatedAt } = data;
  const authorName = author.displayName || author.username;
  const description = content.length > 20 ? content.slice(0, 20) + '...' : content;
  const time = getTimestamp(updatedAt);

  const handleNavigate = () => {
    navigate(`/posts/${id}`);
  }

  return (
    <div>
      <div className='link-container' onClick={handleNavigate}>
        <p><Link to={`/profile/` + author.username}>{authorName}</Link></p>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{time}</p>
      </div>
    </div>
  );
}

function PostList({posts}) {
  return (
    <section className="posts">
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