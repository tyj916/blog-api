function Dashboard() {
  const posts = [];

  return (
    <>
      <div>
        <h1>Dashboard</h1>
        <h2>Your Posts</h2>
        <table>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Last Update</th>
            <th></th>
          </tr>
          {posts && posts.map(post => {
            return (
              <tr key={post.id}>
                <td><a href={`/post/${post.id}`}>{post.title}</a></td>
                <td>{post.status}</td>
                <td>{post.updatedAt}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            )
          })}
        </table>
      </div>
    </>
  );
}

export default Dashboard;