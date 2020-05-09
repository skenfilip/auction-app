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

class Register extends Component {
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
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ margin: "3 0 2" }}
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
          </form>
        </div>
      </Container>
    );
  }
}

export default Register;
