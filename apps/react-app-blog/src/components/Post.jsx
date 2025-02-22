import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTimestamp, getAuthorName, getCurrentUserId, getAuthToken } from "../utils";
import PropTypes from "prop-types";
import Heading from "./Heading";
import styles from '../styles/Post.module.css';

function NewComment({postId}) {
  const [content, setContent] = useState();
  const authToken = getAuthToken();
  const authorId = getCurrentUserId();

  const handleSubmit = (e) => {
    e.preventDefault();
    
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
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea 
          name="content" 
          placeholder="Add a comment"
          onChange={e => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit">Submit</button>
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

function Post() {
  const { postId } = useParams();
  const [title, setTitle] = useState(null);
  const [time, setTime] = useState(null);
  const [content, setContent] = useState(null);
  const [author, setAuthor] = useState(null);
  const [comment, setComment] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/posts/${postId}`, {mode: 'cors'})
      .then(response => {
        if (response.status >= 400) {
          throw new Error("Something is wrong with the server... Please try again later.");
        }

        return response.json();
      })
      .then(response => {
        const { author, content, comment } = response;
        const time = getTimestamp(response.updatedAt);

        setTitle(response.title);
        setAuthor(author);
        setTime(time);
        setContent(content);
        setComment(comment);
      })
      .catch(err => {
        console.error(err);
        setErrorMessage(err);
      })
      .finally(() => setLoading(false));
  }, [postId]);

  if (errorMessage) return <p>{errorMessage}</p>
  if (loading) return <p>Loading...</p>

  return (
    <>
      <Heading title={title} author={author} time={time}/>
      <div className={styles.container}>
        <section>{content}</section>
        <div className={styles.sectionDivider}></div>
        <CommentSection postId={postId} commentList={comment} />
      </div>
    </>
  );
}

Comment.propTypes = {
  comment: PropTypes.object,
}

CommentSection.propTypes = {
  commentList: PropTypes.array,
}

export default Post;