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


export const fetchOpenStreets = () => async (dispatch, getState) => {
    const response = await fetch('https://data.cityofnewyork.us/resource/uiay-nctu.json');
    const openStreets = await response.json();
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