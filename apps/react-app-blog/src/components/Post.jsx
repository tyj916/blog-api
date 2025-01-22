import { useParams } from "react-router-dom";

function Post() {
  const { postId } = useParams();

  return (
    <div>
      This is post {postId}
    </div>
  );
}

export default Post;