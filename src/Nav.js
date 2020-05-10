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

import SearchIcon from "@material-ui/icons/Search";

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      category: event.target.value,
    });
  };

  render() {
    const { isAuthenticated, login, logout } = this.props.auth;
    const endAdornment = {
      endAdornment: (
        <Link to="/">
          <InputAdornment position="end">
            <SearchIcon style={{ color: "black" }} />
          </InputAdornment>
        </Link>
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
                to="/"
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
                  <MenuItem value="Games">Games</MenuItem>
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
                to="/"
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
              <Link to="/login">
                <Button
                  variant="contained"
                  style={{
                    color: "white",
                    backgroundColor: "#1f2833",
                    margin: "0px",
                  }}
                >
                  {isAuthenticated() ? "Log Out" : "Log In"}
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}
export default Nav;
