import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Card from "./Card";
import Grid from "@material-ui/core/Grid";
import { TextField, Paper, Button } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
export default class Sell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: this.formatDate(new Date()),
      bidName: "",
      category: "",
      startPrice: "",
    };
  }
  formatDate = (date) => {
    let formatted_date =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();
    return formatted_date;
  };
  handleDateChange = (date) => {
    let formatted_date = this.formatDate(date);
    this.setState({
      selectedDate: formatted_date,
    });
  };
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
  handleBidNameChange = (value) => {
    this.setState({
      bidName: value,
    });
  };
  handleCategoryChange = (value) => {
    this.setState({
      category: value,
    });
  };
  handleStartPriceChange = (value) => {
    if (this.isNumber(value)) {
      this.setState({
        startPrice: value,
      });
    }
  };
  isNumber(number) {
    return (
      (number.charCodeAt(number.length - 1) >= 48 &&
        number.charCodeAt(number.length - 1) <= 57) ||
      number === ""
    );
  }

  createItem() {
    axios
      .post(
        `http://localhost:8080/api/item`,
        {
          startPrice: this.state.startPrice,
          end: this.state.selectedDate,
          categoryName: this.state.category,
          bidName: this.state.bidName,
        },
        {
          headers: {
            Authorization: window.localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          this.props.history.push("/home");
        }
      });
  }
  render() {
    console.log(this.state.selectedDate);
    return (
      <div style={{ width: "70%", margin: "0 auto" }}>
        <Grid container align="center" justify="center" alignItems="center">
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="bidName"
              label="Bid Name"
              name="bidName"
              autoComplete="bidName"
              autoFocus
              value={this.state.bidName}
              onChange={(event) => this.handleBidNameChange(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="startPrice"
              label="Start Price"
              name="startPrice"
              autoComplete="startPrice"
              autoFocus
              value={this.state.startPrice}
              onChange={(event) =>
                this.handleStartPriceChange(event.target.value)
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="category"
              label="Category"
              name="category"
              autoComplete="category"
              autoFocus
              value={this.state.category}
              onChange={(event) =>
                this.handleCategoryChange(event.target.value)
              }
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="yyyy-MM-dd"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date picker inline"
                  value={this.state.selectedDate}
                  onChange={this.handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
                <KeyboardTimePicker
                  margin="normal"
                  variant="inline"
                  id="time-picker"
                  label="Time picker"
                  value={this.state.selectedDate}
                  onChange={this.handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "0 auto", display: "block" }}
              onClick={() => this.createItem()}
            >
              Add For Sale
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}
