function Comment({commentList}) {
  return (
    <section>
      {commentList.map(comment => {
        const { author } = comment;
        const authorName = author.displayName || author.username;

        return (
          <div key={comment.id}>
            <p>{authorName}</p>
            <p>{comment.content}</p>
          </div>
        );
      })}
    </section>
  )
}

export default Comment;