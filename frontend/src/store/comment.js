import jwtFetch from "./jwt";

const RECEIVE_COMMENT = "RECEIVE_COMMENT";
const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
const REMOVE_COMMENT = "REMOVE_COMMENT";

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

export const createComment = (data) => async (dispatch) => {
  try {
    debugger;
    const res = await jwtFetch("/api/comments/", {
      method: "POST",
      body: JSON.stringify(data),
    });
    debugger;
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
      dispatch(removeComment(commentId));
    }
  } catch (error) {
    // Handle error
    console.error("Failed to delete comment:", error);
  }
};

const commentsReducer = (state = {}, action) => {
  const nextState = { ...state };

  switch (action.type) {
    case RECEIVE_COMMENTS:
      return { ...nextState, ...action.comments };
    case RECEIVE_COMMENT:
      nextState[action.comment.id] = action.comment;
      return nextState;
    case REMOVE_COMMENT:
      delete nextState[action.commentId];
      return nextState;
    default:
      return state;
  }
};

export default commentsReducer;
