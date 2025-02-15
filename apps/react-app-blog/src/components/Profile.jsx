import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostList from "./PostList";
import Heading from "./Heading";
import styles from "../styles/Profile.module.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const jwt = JSON.parse(localStorage.getItem('jwt'));
  const username = useParams().username || jwt.username; // if params not provided then get current user profile

  useEffect(() => {
    fetch(`http://localhost:3000/api/users/${username}/posts`, { mode: 'cors' })
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
  }, [username]);

  if (loading) return <p>Loading...</p>;
  if (errorMessage) return <p>{errorMessage}</p>

  return (
    <>
      <Heading title={user.displayName} description={`@${user.username}`}  />
      <section className={styles.container}>
        <PostList posts={user.writtenPost.map((post) => {
          return {...post, author: user}
        })} />
      </section>
    </>
  );
}

export default Profile;