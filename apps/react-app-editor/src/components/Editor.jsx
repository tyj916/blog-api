import { useEffect, useState } from "react";
import TinyMCE from "./TinyMCE";
import { getAuthToken } from "../utils";
import { useParams } from "react-router-dom";

function Editor() {
  const { postId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const authToken = getAuthToken();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch(`${import.meta.env.VITE_API_URL}/posts`, {
      method: 'post',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + authToken,
      },
      body: JSON.stringify({
        title,
        content,
        status,
      }),
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        errorMessage('');
      })
      .catch(err => {
        console.error(err);
        setErrorMessage('Something went wrong while submitting, please try again later.');
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (postId) {
      fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, { mode: 'cors' })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));
    }
  }, [postId]);

  return (
    <div>
      <h1>Editor</h1>
      <section>
        <form onSubmit={handleSubmit}>
          <ul>
            <li>
              <label htmlFor="title">Post Title</label>
              <input 
                type="text" 
                name="title" 
                id="title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)} 
                required
              />
            </li>
            <li>
              <label>Content</label>
              <TinyMCE content={content} setContent={setContent} />
            </li>
            <li>
              {loading ? <p>Loading...</p>
                : <>
                  <button 
                    type="submit"
                    onClick={() => setStatus('Draft')}
                  >Save to draft</button>
                  <button 
                    type="submit"
                    onClick={() => setStatus('Published')}
                  >Publish</button>
                </>}
            </li>
            {errorMessage && <li>
              <p>{errorMessage}</p>
            </li>}
          </ul>
        </form>
      </section>
    </div>
  )
}

export default Editor;