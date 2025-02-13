import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTimestamp } from "../utils";
import PropTypes from "prop-types";
import Heading from "./Heading";

function Comment({comment}) {
  const { author, createdAt, content } = comment;
  const authorName = author.displayName || author.username;
  const time = getTimestamp(createdAt);

  return (
    <div>
      <p><Link to={`/profile/${author.username}`}>{authorName}</Link> {time}</p>
      <p>{content}</p>
    </div>
  );
}

function CommentSection({commentList}) {
  const hasComment = commentList.length !== 0;

  return (
    <section>
      <h2>Comments</h2>
      {hasComment ? commentList.map(comment => {
        return <Comment key={comment.id} comment={comment} />
      }) : <p>No comment yet.</p>}
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
      <section>{content}</section>
      <CommentSection commentList={comment} />
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