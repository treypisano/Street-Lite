import React from "react";
import Homepage from "./components/Homepage/Homepage";
import Footer from "../src/components/Footer/Footer";
import SignupForm from "./components/SessionForms/SignupForm";

function App() {
  return (
    <div>
      <Homepage />
      <SignupForm />
      <Footer />
    </div>
  );
}

export default App;
