import jwtFetch from "./jwt";

const RECEIVE_COMMENT = "RECEIVE_COMMENT";
const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
const REMOVE_COMMENT = "REMOVE_COMMENT";
const CLEAR_COMMENTS = "CLEAR_COMMENT";

export const receiveComment = (comment) => {
  return {
    type: RECEIVE_COMMENT,
    comment,
  };
};

export const receiveComments = (comments) => {
  return {
    type: RECEIVE_COMMENTS,
    comments,
  };
};

export const removeComment = (commentId) => {
  return {
    type: REMOVE_COMMENT,
    commentId,
  };
};

export const clearComments = () => {
  return {
    type: CLEAR_COMMENTS,
    payload: "destroying comments",
  };
};

// export const createComment = (comment) => async (dispatch) => {
//   debugger;
//   const res = await jwtFetch("/api/comments/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(comment),
//   });
//   if (res.ok) {
//     const data = await res.json();
//     dispatch(receiveComment(data));
//   }
// };

export const fetchCommentsByEventId = (eventId) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/comments/${eventId}`);
    if (res.ok) {
      const comments = await res.json();
      dispatch(receiveComments(comments));
    }
  } catch (error) {
    console.error("Failed to fetch comments:", error);
  }
};

export const createComment = (data) => async (dispatch) => {
  try {
    const res = await jwtFetch("/api/comments/", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const comment = await res.json();
    dispatch(receiveComment(comment));
  } catch (err) {
    const resBody = await err.json();
    console.log(resBody);
    //   if (resBody.statusCode === 400) {
    //     return dispatch(receiveErrors(resBody.errors));
    //   }
  }
};

export const updateComment = (commentId, body) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/comments/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body }),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(receiveComment(data));
    }
  } catch (error) {
    // Handle error
    console.error("Failed to update comment:", error);
  }
};

export const deleteComment = (commentId) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/comments/${commentId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      await dispatch(removeComment(commentId));
    }
  } catch (error) {
    // Handle error
    console.error("Failed to delete comment:", error);
  }
};

const commentsReducer = (state = [], action) => {
  const nextState = { ...state };

  switch (action.type) {
    case RECEIVE_COMMENTS:
      return action.comments;
    case RECEIVE_COMMENT:
      // nextState[action.comment._id] = action.comment;
      // return nextState;
      return state.concat(action.comment);
    case REMOVE_COMMENT:
      const commentIdToRemove = action.commentId;
      return state.filter((comment) => comment._id !== commentIdToRemove);
    case CLEAR_COMMENTS:
      return {};
    default:
      return state;
  }
};

export default commentsReducer;
