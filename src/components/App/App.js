import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "../Main/Main";

function App() {
  return (
    <div className="App">
      <div className="page-container">
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
