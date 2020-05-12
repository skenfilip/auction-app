import React, { Component } from "react";
import { connect } from "react-redux";
import setToken from "../actions/setToken";

class Auth extends Component {
  constructonr() {
    this.authenticated = false;
  }
  login(token) {
    this.authenticated = true;
    this.props.onChange(token);
  }
  logout() {
    this.authenticated = false;
    this.props.onChange("");
  }
  isAuthenticated() {
    return this.authenticated;
  }
  render() {
    return <div></div>;
  }
}

const mapStateToProps = (state) => {
  return {
    token: state,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (value) => {
      dispatch(setToken(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
