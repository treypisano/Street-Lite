import React from "react";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Homepage from "./components/Homepage/Homepage";
import Footer from "../src/components/Footer/Footer";
import SignupForm from "./components/SessionForms/SignupForm";
import { getCurrentUser } from './store/session';
import NavigationBar from './components/Navigation/NavigationBar'

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
      </Switch>
      <SignupForm />
      <Footer />
    </div>
  );
}

export default App;
