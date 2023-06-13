export const OPEN_LOGIN_MODAL = 'modal/OPEN_LOGIN_MODAL';
export const CLOSE_LOGIN_MODAL = 'modal/CLOSE_LOGIN_MODAL';
export const OPEN_SIGNUP_MODAL = 'modal/OPEN_SIGNUP_MODAL';
export const CLOSE_SIGNUP_MODAL = 'modal/CLOSE_SIGNUP_MODAL';


const modalReducer = (state = null, action) => {
    Object.freeze(state);
    let newState = {...state};
    
    switch (action.type) {
        case OPEN_LOGIN_MODAL:
            newState.modal = "login";
            return newState;
        case CLOSE_LOGIN_MODAL:
            newState.modal = null;
            return newState;
        case OPEN_SIGNUP_MODAL:
            newState.modal = "signup";
            return newState;
        case CLOSE_SIGNUP_MODAL:
            newState.modal = null;
            return newState;
        default:
            return state;
    }
}

export default modalReducer