import PropTypes from "prop-types";
import { getAuthToken } from "../utils";

function DeletePostButton({ postId, redirectUrl }) {
  const authToken = getAuthToken();

  const handleDelete = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
      method: 'delete',
      headers: {
        'Authorization': 'Bearer ' + authToken,
      }
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        window.location.href = redirectUrl;
      })
      .catch(err => console.error(err));
  }

  return (
    <button onClick={handleDelete}>Delete</button>
  )
}

DeletePostButton.propTypes = {
  postId: PropTypes.string,
  redirectUrl: PropTypes.string,
}

export default DeletePostButton;