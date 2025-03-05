import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCurrentUserId, getTimestamp, isLoggedIn } from "../utils";
import Heading from "./Heading";
import CommentSection from "./CommentSection";
import styles from '../styles/Post.module.css';

function Post() {
  const { postId } = useParams();
  const [title, setTitle] = useState(null);
  const [time, setTime] = useState(null);
  const [content, setContent] = useState(null);
  const [author, setAuthor] = useState(null);
  const [comment, setComment] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUserId = isLoggedIn() ? getCurrentUserId() : null;

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
      {currentUserId === author.id && 
        <div className={styles.container}>
          <button>Edit Post</button>
        </div>
      }
      <div className={styles.container}>
        <section>{content}</section>
        <div className={styles.sectionDivider}></div>
        <CommentSection postId={postId} commentList={comment} />
      </div>
    </>
  );
}

export default Post;