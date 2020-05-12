import React, { Component } from "react";
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  FormControlLabel,
  Grid,
  Box,
  TextField,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import { connect } from "react-redux";
import setToken from "../actions/setToken";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      success: false,
      fail: false,
    };
  }
  handleEmailChange = (value) => {
    this.setState({
      email: value,
    });
  };
  handlePasswordChange = (value) => {
    this.setState({
      password: value,
    });
  };

  tryLogin = () => {
    axios
      .post("http://localhost:8080/api/user/login", {
        username: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        if (res.status === 200) {
          window.localStorage.setItem("token", res.data.token);
          this.props.onChange(res.data.token);
          console.log(this.props.token.token);
          this.setState({
            success: true,
          });
          this.props.history.push("/home");
        }
      })
      .catch((error) => {
        this.setState({
          fail: true,
        });
      });
  };
  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div
          style={{
            marginTop: "50",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            style={{
              margin: "1",
              backgroundColor: "#dc004e",
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{ color: "black" }}>
            Log In
          </Typography>
          <form style={{ width: "100%", marginTop: "1" }} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={this.state.email}
              onChange={(event) => this.handleEmailChange(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={(event) =>
                this.handlePasswordChange(event.target.value)
              }
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              style={{ margin: "3 0 2" }}
              onClick={this.tryLogin}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Register"}
                </Link>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Snackbar
                  open={this.state.success}
                  autoHideDuration={6000}
                  onClose={() => this.setState({ success: false })}
                >
                  <Alert severity="success">Login Successful</Alert>
                </Snackbar>
                <Snackbar
                  open={this.state.fail}
                  autoHideDuration={6000}
                  onClose={() => this.setState({ fail: false })}
                >
                  <Alert severity="error">Invalid Credentials</Alert>
                </Snackbar>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
