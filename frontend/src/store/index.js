import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import openStreetReducer from './openstreets';
import sessionReducer, { sessionErrorsReducer } from './session';
import modalReducer from './modal';

const rootReducer = combineReducers({
  openStreet: openStreetReducer,
  session: sessionReducer,
  errors: sessionErrorsReducer,
  modal: modalReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;