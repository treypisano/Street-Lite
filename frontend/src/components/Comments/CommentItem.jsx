import React from "react";

const CommentItem = ({ comment }) => {
  return (
    <div>
      <p>{comment.body}</p>
      <p>Posted by: {comment.userId}</p>
    </div>
  );
};

export default CommentItem;
