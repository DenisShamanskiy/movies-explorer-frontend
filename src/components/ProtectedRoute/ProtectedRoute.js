import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { SignContext } from "../../contexts/SignContext";

function ProtectedRoute({ component: Component, ...props }) {
  const logContext = useContext(SignContext);
  const { loggedIn } = logContext;

  return (
    <Route>{loggedIn ? <Component {...props} /> : <Redirect to="/" />}</Route>
  );
}

export default ProtectedRoute;
