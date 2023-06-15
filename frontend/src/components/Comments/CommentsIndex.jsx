import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommentsByEventId, clearComments } from "../../store/comment";

const CommentIndex = () => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comment);
  const currentEvent = useSelector((state) => state.openStreet[0]);
  const eventId = currentEvent?._id;

  //   useEffect(() => {}, []);

  useEffect(() => {
    dispatch(clearComments());
    dispatch(fetchCommentsByEventId(eventId));
  }, []);

  return (
    <div>
      <h2>Comments</h2>
      {Object.keys(comments).length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {Object.keys(comments).map((commentId) => (
            <li key={commentId}>{comments[commentId].body}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentIndex;
