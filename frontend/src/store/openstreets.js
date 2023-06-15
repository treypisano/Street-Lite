import jwtFetch from "./jwt";
import { Loader } from "@googlemaps/js-api-loader";

const RECEIVE_OPENSTREET = "RECEIVE_OPENSTREET";
const RECEIVE_OPENSTREETS = "RECIEVE_OPENSTREETS";
const RECEIVE_EVENT = "RECEIVE_EVENT";
const CLEAR_EVENTS = "CLEAR_EVENTS";
const REMOVE_EVENT = "REMOVE_EVENT";

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

export const clearEvents = () => {
  return {
    type: CLEAR_EVENTS,
    payload: "destroying events",
  };
};

export const removeEvent = (eventId) => {
  return {
    type: REMOVE_EVENT,
    eventId,
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
  // console.log(splitUpData);
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

  const response = await jwtFetch("/api/openstreets/all", {
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

export const updateEvent = (event) => async (dispatch) => {
  const response = await jwtFetch(`/api/events/${event.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(receiveOpenstreet(data));
  }
};

export const deleteEvent = (eventId) => async (dispatch) => {
  const response = await jwtFetch(`/api/events/${eventId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(removeEvent(eventId));
  }
};

export const fetchOpenStreet = (id) => async (dispatch, getState) => {
  const response = await jwtFetch(`/api/openstreets/${id}`, {
    method: "POST",
  });
  const data = await response.json();

    dispatch(receiveEvent(data))

    return data
};

// export const fetchPlacesData = (location) => async (dispatch, getState) => {
//   const secretGoogleAPIKey = process.env.REACT_APP_GOOGLE_API_KEY
  
//   // debugger
//   // const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=800&type=restaurant&key=${secretGoogleAPIKey}}`)
//   // const data = await response.json()

// }

// Selector
export const getEvents = (state) => {
  if (state.openStreets) {
    return Object.values(state.openStreets);
  } else {
    return [];
  }
};

const openStreetReducer = (state = [], action) => {
  const nextState = { ...state };
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_OPENSTREETS:
      return action.openStreets;
    case RECEIVE_EVENT:
      return state.concat(action.event);
    case CLEAR_EVENTS:
      return [];
    case REMOVE_EVENT:
      const eventIdToRemove = action.eventId;
      return state.filter((event) => event._id !== eventIdToRemove);
    default:
      return state;
  }
};

export default openStreetReducer;
