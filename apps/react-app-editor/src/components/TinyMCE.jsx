import { Editor } from '@tinymce/tinymce-react';

function TinyMCE() {
  return (
    <Editor
      apiKey='dv048tm8ry39e4cyn6wp5h8nm8qwtfkd0pvm0f3ltvyqij3g'
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
      initialValue="Start writing here!"
    />
  );
}

export default TinyMCE;