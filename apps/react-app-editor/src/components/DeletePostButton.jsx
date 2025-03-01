import { getAuthToken } from "../utils";

function DeletePostButton({ postId }) {
  const authToken = getAuthToken();

  const handleDelete = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
      method: 'delete',
      headers: {
        'Authorization': 'Bearer ' + authToken,
      }
    }).then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }

  return (
    <button onClick={handleDelete}>Delete</button>
  )
}

export default DeletePostButton;