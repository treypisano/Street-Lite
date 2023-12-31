import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./store";
import { createEvent, updateEvent, deleteEvent } from "./store/openstreets";
import { createComment, updateComment, deleteComment } from "./store/comment";

let store = configureStore({});

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.createEvent = createEvent;
  window.updateEvent = updateEvent;
  window.deleteEvent = deleteEvent;
  window.createComment = createComment;
  window.deleteComment = deleteComment;
}
function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
