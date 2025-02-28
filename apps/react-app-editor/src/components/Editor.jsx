import { useState } from "react";
import TinyMCE from "./TinyMCE";
import { getCurrentUserId } from "../utils";

function Editor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const currentUserId = getCurrentUserId();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.table({
      title,
      content,
      status: 'published',
      authorId: currentUserId,
    })
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