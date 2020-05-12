import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import "./App.css";
import Navigation from "./Nav";
import Auth from "./Auth/Auth";
import Login from "./UserManagement/Login.js";
import Register from "./UserManagement/Register";
import { PrivateRoute } from "./PrivateRoute";
import Welcome from "./Welcome";
import Sell from "./Sell";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="background">
        <Navigation />
        <div className="body">
          <Route
            exact
            path="/"
            render={(props) => <Welcome auth={this.auth} {...props} />}
          />
          <Route
            exact
            path="/login"
            render={(props) => <Login auth={this.auth} {...props} />}
          />
          <Route
            exact
            path="/register"
            render={(props) => <Register auth={this.auth} {...props} />}
          />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute exact path="/sell" component={Sell} />
        </div>
      </div>
    );
  }
}
export default App;
