import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Card from "./Card";
import Grid from "@material-ui/core/Grid";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      bids: [],
    };
  }
  componentDidMount() {
    this.getAllItems();
  }
  getAllItems = () => {
    axios
      .get("http://localhost:8080/api/item/all", {
        headers: {
          Authorization: window.localStorage.getItem("token"),
        },
      })
      .then((res) => {
        this.setState({
          items: res.data,
        });
      });
  };

  render() {
    return (
      <div style={{ width: "70%", margin: "0 auto" }}>
        <Grid container spacing={3} style={{ marginTop: "30px" }}>
          {this.state.items.map((item) => (
            <Card data={item} />
          ))}
        </Grid>
      </div>
    );
  }
}
