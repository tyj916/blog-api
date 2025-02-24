import TinyMCE from "./TinyMCE";

function Editor() {
  return (
    <div>
      <h1>Editor</h1>
      <section>
        <form>
          <ul>
            <li>
              <label htmlFor="title">Post Title</label>
              <input type="text" name="title" id="title" />
            </li>
            <li>
              <TinyMCE />
            </li>
            <li>
              <button>Save to draft</button>
              <button>Publish</button>
            </li>
          </ul>
        </form>
      </section>
    </div>
  )
}

export default Editor;