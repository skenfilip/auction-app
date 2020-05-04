import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import "./App.css";
import Navigation from "./Nav";
import Auth from "./Auth/Auth";
import Callback from "./Callback";
import Login from "./UserManagement/Login.js";
import Register from "./UserManagement/Register";

class App extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }
  render() {
    return (
      <div className="background">
        <Navigation auth={this.auth} />
        <div className="body">
          <Route
            path="/"
            exact
            render={(props) => <Home auth={this.auth} {...props} />}
          />
          <Route
            path="/callback"
            exact
            render={(props) => <Callback auth={this.auth} {...props} />}
          />
          <Route
            path="/login"
            exact
            render={(props) => <Login auth={this.auth} {...props} />}
          />
          <Route
            path="/register"
            exact
            render={(props) => <Register auth={this.auth} {...props} />}
          />
          <Route
            path="/profile"
            render={(props) =>
              this.auth.isAuthenticated() ? (
                <Profile auth={this.auth} {...props} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
        </div>
      </div>
    );
  }
}
export default App;
