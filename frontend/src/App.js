import React from "react";
import { Route, Switch } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Footer from "../src/components/Footer/Footer";
import NavigationBar from "./components/Navigation/NavigationBar";

function App() {
  return (
    <div>
      <NavigationBar />
      <Switch>
        <Route path="/" exact>
              <Homepage />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
