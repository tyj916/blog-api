function Comment({commentList}) {
  return (
    <section>
      {commentList.map(comment => {
        return (
          <div key={comment.id}>
            <p>{comment.authorId}</p>
            <p>{comment.content}</p>
          </div>
        );
      })}
    </section>
  )
}

export default Comment;