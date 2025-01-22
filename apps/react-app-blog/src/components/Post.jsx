import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTimeDifference } from "../utils";

function Post() {
  const { postId } = useParams();
  const [title, setTitle] = useState(null);
  const [time, setTime] = useState(null);
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/posts/${postId}`, {mode: 'cors'})
      .then(response => {
        if (response.status >= 400) {
          throw new Error("Something is wrong with the server... Please try again later.");
        }

        return response.json();
      })
      .then(response => {
        const time = getTimeDifference(response.updatedAt);
        setTitle(response.title);
        setTime(time);
        setContent(response.content);
      })
      .catch(err => {
        console.error(err);
      })
  }, [postId]);

  return (
    <div>
      <h1>{title}</h1>
      <p>{time}</p>
      <section>{content}</section>
    </div>
  );
}

export default Post;