import { useEffect, useState } from "react";
import { convertTimestamp, getCurrentUsername } from "../utils";

function Dashboard() {
  const [posts, setPosts] = useState();
  const username = getCurrentUsername();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/users/${username}/posts`, {mode: "cors"})
      .then(response => response.json())
      .then(json => {
        setPosts(json.writtenPost);
      })
      .catch(err => console.error(err))
  }, [username])

  return (
    <>
      <div>
        <h1>Dashboard</h1>
        <h2>Your Posts</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Last Update</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {posts && posts.map(post => {
              return (
                <tr key={post.id}>
                  <td><a href={`/post/${post.id}`}>{post.title}</a></td>
                  <td>{post.status}</td>
                  <td>{convertTimestamp(post.updatedAt)}</td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Dashboard;