import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../store/comment";
import { useEffect } from "react";

const CommentForm = () => {
  const [body, setBody] = useState("");

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const userId = currentUser?._id;

  const currentEvent = useSelector((state) => state.openStreet[0]);
  const eventId = currentEvent?._id;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new comment object
    const newComment = {
      userId,
      eventId,
      body,
    };

    // Dispatch the createComment action to save the comment
    dispatch(createComment(newComment));

    // Clear the comment input field
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write a comment..."
        required
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
