import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Divider,
  Typography,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  InputAdornment,
  Grid,
} from "@material-ui/core";
import { connect } from "react-redux";
import setToken from "./actions/setToken";
import axios from "axios";

import SearchIcon from "@material-ui/icons/Search";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      categories: [],
    };
  }
  componentWillMount() {
    axios
      .get("http://localhost:8080/api/category", {
        headers: {
          Authorization: window.localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            categories: res.data,
          });
        }
      });
  }

  handleChange = (event) => {
    if (event.target.value === "") {
      window.localStorage.removeItem("category");
    } else {
      this.setState(
        {
          category: event.target.value,
        },
        () => {
          window.localStorage.setItem("category", this.state.category);
        }
      );
    }
  };
  render() {
    const endAdornment = {
      endAdornment: (
        <InputAdornment position="end">
          <SearchIcon style={{ color: "black" }} />
        </InputAdornment>
      ),
    };
    return (
      <AppBar
        position="relative"
        style={{
          backgroundColor: "white",
          width: "70%",
          margin: "0 auto",
          height: "50",
        }}
      >
        <Toolbar
          style={{
            background: "white",
            padding: "0",
          }}
        >
          <Grid container align="center" justify="center" alignItems="center">
            <Grid item xs>
              <Link
                underline="none"
                to="/home"
                style={{
                  textDecoration: "none",
                  width: "75px",
                  height: "75px",
                }}
              >
                <img
                  src={require("./resources/logo.png")}
                  style={{ width: "inherit", height: "inherit" }}
                />
              </Link>
            </Grid>
            <Divider orientation="vertical" flexItem={true} light={true} />
            <Grid item xs>
              <FormControl
                style={{
                  width: "100px",
                }}
              >
                <InputLabel>Categories</InputLabel>
                <Select
                  defaultValue=""
                  value={this.state.category}
                  onChange={this.handleChange}
                >
                  <MenuItem value="">---Select---</MenuItem>
                  {this.state.categories.map((category) => (
                    <MenuItem value={category.categoryName}>
                      {category.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs>
              <div className="roundBorder" style={{ width: "300px" }}>
                <TextField
                  label="Search..."
                  style={{ width: "inherit" }}
                  variant="outlined"
                  InputProps={endAdornment}
                />
              </div>
            </Grid>
            <Grid item xs>
              <Link
                to="/sell"
                style={{
                  textDecoration: "none",
                  width: "50px",
                  margin: "0px",
                }}
              >
                <Typography style={{ color: "black", width: "inherit" }}>
                  Sell
                </Typography>
              </Link>
            </Grid>
            <Grid item xs>
              <Link
                to="/profile"
                style={{ textDecoration: "none", width: "50px", margin: "0px" }}
              >
                <Typography style={{ color: "black", width: "inherit" }}>
                  Profile
                </Typography>
              </Link>
            </Grid>
            <Grid item xs>
              {this.props.token.token === "" ? (
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    style={{
                      color: "white",
                      backgroundColor: "#1f2833",
                      margin: "0px",
                    }}
                  >
                    LOG IN
                  </Button>
                </Link>
              ) : (
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    style={{
                      color: "white",
                      backgroundColor: "#1f2833",
                      margin: "0px",
                    }}
                    onClick={() => {
                      window.localStorage.removeItem("token");
                      this.props.onChange("");
                    }}
                  >
                    LOG OUT
                  </Button>
                </Link>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
