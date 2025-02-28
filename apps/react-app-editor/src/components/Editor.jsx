import { useState } from "react";
import TinyMCE from "./TinyMCE";
import { getAuthToken } from "../utils";

function Editor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const authToken = getAuthToken();

  const handleSubmit = (e) => {
    e.preventDefault();

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
        status: 'published',
      }),
    }).then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.error(err))
  }

  return (
    <div>
      <h1>Editor</h1>
      <section>
        <form>
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
              <button>Save to draft</button>
              <button type="submit" onClick={handleSubmit}>Publish</button>
            </li>
          </ul>
        </form>
      </section>
    </div>
  )
}

export default Editor;