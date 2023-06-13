import jwtFetch from "./jwt";

const RECEIVE_OPENSTREET = "RECEIVE_OPENSTREET";
const RECEIVE_OPENSTREETS = "RECIEVE_OPENSTREETS";
const RECEIVE_EVENT = "RECEIVE_EVENT";

export const receiveOpenstreet = (openStreet) => {
  return {
    type: RECEIVE_OPENSTREET,
    openStreet,
  };
};

export const receiveOpenstreets = (openStreets) => {
  return {
    type: RECEIVE_OPENSTREETS,
    openStreets,
  };
};

export const receiveEvent = (event) => {
  return {
    type: RECEIVE_EVENT,
    event,
  };
};

function splitData(data) {
  const splitArray = [];
  let size = 100;

  for (let i = 0; i < data.length; i += 100) {
    const chunk = data.slice(i, i + size);
    splitArray.push(chunk);
  }

  return splitArray;
}

function saveOpenStreetsData(openStreets) {
  const splitUpData = splitData(openStreets);
  console.log(splitUpData);
  splitUpData.forEach((chunk) => {
    jwtFetch("api/openstreets/", {
      method: "POST",
      body: JSON.stringify(chunk), // Reducing size of object http request
    });
  });
}

export const fetchOpenStreets = () => async (dispatch, getState) => {
  // Add fetch with POST request to make new event in controller
  // Make the route in the controller

  // If database hasnt been updated in a week, then save to database

  // const response = await fetch('https://data.cityofnewyork.us/resource/uiay-nctu.json');
  // const openStreets = await response.json();
  // saveOpenStreetsData(openStreets)

  const response = await jwtFetch("api/openstreets/all", {
    method: "POST",
  });
  const data = await response.json();

  dispatch(receiveOpenstreets(data));
  return data;
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

const openStreetReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_OPENSTREETS:
      return action.openStreets;
    case RECEIVE_EVENT:
      return state.concat(action.event);
    default:
      return state;
  }
};

export default openStreetReducer;
