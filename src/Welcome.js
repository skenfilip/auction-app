import React, { Component } from "react";
export default class Welcome extends Component {
  render() {
    return (
      <div
        style={{
          width: "70%",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1>Welcome to Online Auctions</h1>
        <h1>Please login to continue</h1>
      </div>
    );
  }
}
