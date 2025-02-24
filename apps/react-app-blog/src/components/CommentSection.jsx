import { useState } from "react";
import { Link } from "react-router-dom";
import { getTimestamp, getAuthorName, getCurrentUserId, getAuthToken } from "../utils";
import PropTypes from "prop-types";
import styles from '../styles/CommentSection.module.css';

function NewComment({postId}) {
  const [content, setContent] = useState();
  const [loading, setLoading] = useState();
  const authToken = getAuthToken();
  const authorId = getCurrentUserId();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    fetch(`http://localhost:3000/api/posts/${postId}/comments`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        content,
        postId,
        authorId,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.id) {
          window.location.reload();
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }

  return (
    <div className={styles.newComment}>
      <form onSubmit={handleSubmit}>
        <textarea 
          name="content" 
          placeholder="Add a comment"
          onChange={e => setContent(e.target.value)}
          required
        ></textarea>
        <div>
          {
            loading ? <button disabled="disabled">Loading...</button>
              : <button type="submit">Submit</button>
          }
        </div>
      </form>
    </div>
  )
}

function Comment({comment}) {
  const { author, createdAt, content } = comment;
  const authorName = getAuthorName(author);
  const time = getTimestamp(createdAt);

  return (
    <div className={styles.comment}>
      <p className={styles.info}>
        <Link to={`/profile/${author.username}`} className={styles.author}>{authorName}</Link>
        <span> </span>
        <span className={styles.time}>{time}</span>
      </p>
      <p className={styles.content}>{content}</p>
    </div>
  );
}

function CommentSection({postId, commentList}) {
  const hasComment = commentList.length !== 0;

  return (
    <section className={styles.comments}>
      <h2 className={styles.title}>Comments</h2>
      <NewComment postId={postId} />
      <div className={styles.commentList}>
        {hasComment ? commentList.map(comment => {
          return <Comment key={comment.id} comment={comment} />
        }) : <p>No comment yet.</p>}
      </div>
    </section>
  )
}

NewComment.propTypes = {
  postId: PropTypes.string,
}

Comment.propTypes = {
  comment: PropTypes.object,
}

CommentSection.propTypes = {
  postId: PropTypes.string,
  commentList: PropTypes.array,
}

export default CommentSection;