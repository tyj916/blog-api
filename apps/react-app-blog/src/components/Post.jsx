import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTimeDifference } from "../utils";
import PropTypes from "prop-types";

function Comment({comment}) {
  const { author } = comment;
  const authorName = author.displayName || author.username;

  return (
    <div key={comment.id}>
      <p>{authorName}</p>
      <p>{comment.content}</p>
    </div>
  );
}

function CommentSection({commentList}) {
  return (
    <section>
      {commentList.map(comment => {
        <Comment comment={comment} />
      })}
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
        const authorName = author.displayName || author.username;
        const time = getTimeDifference(response.updatedAt);

        setTitle(response.title);
        setAuthor(authorName);
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
    <div>
      <h1>{title}</h1>
      <p>{author} {time}</p>
      <section>{content}</section>
      <CommentSection commentList={comment} />
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object,
}

CommentSection.propTypes = {
  commentList: PropTypes.array,
}

export default Post;