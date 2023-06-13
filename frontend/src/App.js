import React from "react";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Homepage from "./components/Homepage/Homepage";
import Footer from "../src/components/Footer/Footer";
import { getCurrentUser } from './store/session';
import NavigationBar from './components/Navigation/NavigationBar';
import LoginForm from "./components/SessionForms/LoginForm";
import SignupForm from "./components/SessionForms/SignupForm";
import EventIndexPage from "./components/Events/EventIndexPage";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);


  return loaded && (
    <div>
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
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
