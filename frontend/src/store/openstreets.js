import jwtFetch from "./jwt";

const RECIEVE_OPENSTREET = 'RECIEVE_OPENSTREET';
const RECIEVE_OPENSTREETS = 'RECIEVE_OPENSTREETS';

export const recieveOpenstreet = openStreet => {
    return {
        type: RECIEVE_OPENSTREET,
        openStreet
    };
}

export const recieveOpenstreets = openStreets => {
    return {
        type: RECIEVE_OPENSTREETS,
        openStreets
    };
}

function splitData(data) {
    const splitArray = [];
    let size = 100

    for (let i = 0; i < data.length; i += 100) {
        const chunk = data.slice(i, i + size);
        splitArray.push(chunk);
    }

    return splitArray
}

function saveOpenStreetsData (openStreets) {
    const splitUpData = splitData(openStreets)
    console.log(splitUpData)
    splitUpData.forEach((chunk) => {
        jwtFetch('api/openstreets/', {
            method: 'POST',
            body: JSON.stringify(chunk) // Reducing size of object http request
        })
    })

}

export const fetchOpenStreets = () => async (dispatch, getState) => {
    // Add fetch with POST request to make new event in controller
    // Make the route in the controller

    // If database hasnt been updated in a week, then save to database

    const response = await fetch('https://data.cityofnewyork.us/resource/uiay-nctu.json');
    const openStreets = await response.json();
    // saveOpenStreetsData(openStreets)

    dispatch(recieveOpenstreets(openStreets));
    return openStreets;
}

const openStreetReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECIEVE_OPENSTREETS:
            return action.openStreets;
        default:
            return state;
    }
}

export default openStreetReducer;