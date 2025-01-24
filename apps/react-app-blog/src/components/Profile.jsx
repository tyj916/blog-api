import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem('jwt'));
    const { userId } = jwt;
    
    fetch(`http://localhost:3000/api/users/${userId}/posts`, { mode: 'cors' })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Something is wrong with the server... Please try again later.");
        }

        return response.json();
      })
      .then((response) => setUser(response))
      .catch((err) => {
        console.error(err);
        setErrorMessage(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (errorMessage) return <p>{errorMessage}</p>

  return (
    <section>
      <h1>{user.username}</h1>
      <h2>{user.displayName}</h2>
      {user.writtenPost.length > 0 ? <p>Have posts</p>  : <p>No post yet.</p>}
    </section>
  );
}

export default Profile;