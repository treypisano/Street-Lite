import jwtFetch from "./jwt";

const RECEIVE_EVENT = "RECEIVE_EVENT";
const RECEIVE_EVENTS = "RECEIVE_EVENTS";

export const receiveEvent = (event) => {
  return {
    type: RECEIVE_EVENT,
    event,
  };
};
export const receiveEvents = (events) => {
  return {
    type: RECEIVE_EVENTS,
    events,
  };
};
export const createEvent = (event) => async (dispatch) => {
  const res = await jwtFetch("/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(receiveEvent(data));
  }
};
const eventsReducer = (state = {}, action) => {
  const nextState = { ...state };
  switch (action.type) {
    case RECEIVE_EVENTS:
      return { ...nextState, ...action.events };
    case RECEIVE_EVENT:
      nextState[action.event.id] = action.event;
      return nextState;
    default:
      return state;
  }
};
export default eventsReducer;
