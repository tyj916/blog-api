import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css'

function Post() {
  return (
    <div>
      <p>Author</p>
      <h3>Post Title</h3>
      <p>Short Description</p>
      <p>Posted Time</p>
    </div>
  );
}

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/posts", {mode: 'cors'})
      .then((response) => response.json())
      .then((response) => setPosts(response))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="posts">
      {!posts && <p>Loading...</p>}
      {posts && posts.length > 0 && (
        <div>
          {posts.map((post) => {
            return <Post key={post.id} />
          })}
        </div>
      )}
      {posts && posts.length === 0 && (
        <p>No posts yet.</p>
      )}
    </div>
  );
}

function Main() {
  return (
    <main>
      <div className='container'>
        <Posts />
      </div>
    </main>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default App;