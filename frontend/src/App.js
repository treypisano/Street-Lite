import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, useLocation } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Footer from "../src/components/Footer/Footer";
import { getCurrentUser } from "./store/session";
import NavigationBar from "./components/Navigation/NavigationBar";
import LoginForm from "./components/SessionForms/LoginForm";
import SignupForm from "./components/SessionForms/SignupForm";
import CreateEvent from "./components/Navigation/CreateEvent";
import "bootstrap/dist/css/bootstrap.min.css";
import EventIndexPage from "./components/Events/EventIndexPage";
import EventShowPage from "./components/Events/EventShowPage";
import './index.css';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  const isEventPage = location.pathname.startsWith("/events");
  
  return loaded && (
    <div className="webpage">
      <NavigationBar />
      <Switch>
        <Route path="/" exact>
          <Homepage />
        </Route>
        <Route path="/login" exact>
          <LoginForm />
        </Route>
        <Route path="/signup" exact>
          <SignupForm />
        </Route>
        <Route path="/events" exact>
          <EventIndexPage />
        </Route>
        <Route path="/events/:eventId" exact>
          <EventShowPage />
        </Route>
        <Route path="/createEvent" exact>
          <CreateEvent />
        </Route>
      </Switch>
      {isEventPage && <Footer />}
    </div>

  );
}

export default App;
