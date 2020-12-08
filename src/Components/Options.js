// components/Options.js

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Popup from "./Popup";

const Options = () => {
  return (
    <Router>
      <div style={styles.container}>
        <div>
          <h1>Dejan Despot - Reddit RSS Reader</h1>
          <nav>
            <ul>
              <li>
                <Link to="/popup">Try the popup !</Link>
              </li>
            </ul>
          </nav>
        </div>
        <Switch>
          <Route exact path="/popup">
            <Popup />
          </Route>
          <Route exact path="/">
            <Redirect to="/options.html" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
};
export default Options;
