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
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      fullName: "",
      success: false,
      fail: false,
      errors: "",
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
  handleFullNameChange = (value) => {
    this.setState({
      fullName: value,
    });
  };
  tryRegister = () => {
    axios
      .post(`http://localhost:8080/api/user/register`, {
        username: this.state.email,
        password: this.state.password,
        fullName: this.state.fullName,
      })
      .then((res) => {
        if (res.status === 201) {
          this.setState({
            success: true,
          });
          this.props.history.push("/login/");
        }
      })
      .catch((error) => {
        var error1 = error.response.data["fullName"]
          ? error.response.data["fullName"]
          : undefined;
        var error2 = error.response.data["username"]
          ? error.response.data["username"]
          : undefined;
        var error3 = error.response.data["password"]
          ? error.response.data["password"]
          : undefined;
        var errorsFixed = "";
        if (error1 !== undefined) {
          errorsFixed += error1;
        } else if (error2 !== undefined) {
          errorsFixed += error2;
        } else if (error3 !== undefined) {
          errorsFixed += error3;
        }
        this.setState({
          errors: errorsFixed,
          fail: true,
        });
      });
  };
  render() {
    console.log(this.props);
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
          <Avatar style={{ margin: "1", backgroundColor: "#dc004e" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{ color: "black" }}>
            Register
          </Typography>
          <form style={{ width: "100%", marginTop: "3" }} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fullName"
                  name="fullName"
                  variant="outlined"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  autoFocus
                  value={this.state.fullName}
                  onChange={(event) =>
                    this.handleFullNameChange(event.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={this.state.email}
                  onChange={(event) =>
                    this.handleEmailChange(event.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
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
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              style={{ margin: "3 0 2" }}
              onClick={this.tryRegister}
            >
              Register
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Log in
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
                  <Alert severity="success">Register Successful</Alert>
                </Snackbar>
                <Snackbar
                  open={this.state.fail}
                  autoHideDuration={6000}
                  onClose={() => this.setState({ fail: false })}
                >
                  <Alert severity="error">{this.state.errors}</Alert>
                </Snackbar>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default Register;
