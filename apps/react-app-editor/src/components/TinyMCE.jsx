import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';

function TinyMCE({content, setContent}) {
  return (
    <Editor
      apiKey={import.meta.env.VITE_TINY_MCE_API}
      init={{
        plugins: [
          // Core editing features
          'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'searchreplace', 'table', 'visualblocks', 'wordcount',
        ],
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
      }}
      value={content}
      onEditorChange={(newValue, editor) => setContent(newValue)}
    />
  );
}

TinyMCE.propTypes = {
  content: PropTypes.string,
  setContent: PropTypes.string,
}

export default TinyMCE;