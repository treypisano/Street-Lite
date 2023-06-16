import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommentsByEventId, clearComments } from "../../store/comment";
import CommentItem from "./CommentItem";

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
      {Object.keys(comments).length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {Object.keys(comments)
            .reverse()
            .map((commentId) => (
              <li key={commentId}>
                <CommentItem comment={comments[commentId]} />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default CommentIndex;
