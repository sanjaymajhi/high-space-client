import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ContextProvider } from "./components/Context";
import LandingPage from "./components/landingPage";

function App() {
  return (
    <Router>
      <ContextProvider>
        <Switch>
          <Route path="/" exact component={LandingPage} />
        </Switch>
      </ContextProvider>
    </Router>
  );
}

export default App;
