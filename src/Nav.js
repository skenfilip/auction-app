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
          display: "block",
          margin: "0 auto",
        }}
      >
        <Toolbar
          style={{
            background: "white",
            padding: "0",
          }}
        >
          <Link
            underline="none"
            to="/"
            style={{ textDecoration: "none", height: "100px" }}
          >
            <img
              src={require("./resources/logo.png")}
              style={{ maxWidth: "100px" }}
            />
          </Link>
          <Divider orientation="vertical" flexItem={true} light={true} />
          <FormControl style={{ minWidth: "120px", marginLeft: "20px" }}>
            <InputLabel>Categories</InputLabel>
            <Select
              defaultValue=""
              value={this.state.category}
              onChange={this.handleChange}
            >
              <MenuItem value="Games">Games</MenuItem>
            </Select>
          </FormControl>
          <div className="roundBorder">
            <TextField
              label="Search..."
              style={{ marginLeft: "50px", width: "500px" }}
              variant="outlined"
              InputProps={endAdornment}
            />
          </div>
          <Link to="/" style={{ textDecoration: "none", marginLeft: "50px" }}>
            <Typography style={{ color: "black" }}>Sell</Typography>
          </Link>
          <Link
            to="/profile"
            style={{ textDecoration: "none", marginLeft: "20px" }}
          >
            <Typography style={{ color: "black" }}>Profile</Typography>
          </Link>
          <Link to="/login">
            <Button
              variant="contained"
              style={{
                color: "white",
                backgroundColor: "#1f2833",
                marginLeft: "25px",
                borderRadius: "20px",
              }}
            >
              {isAuthenticated() ? "Log Out" : "Log In"}
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    );
  }
}
export default Nav;
