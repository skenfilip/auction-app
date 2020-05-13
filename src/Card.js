import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Popover from "@material-ui/core/Popover";

import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

export default function SimpleCard(props) {
  const [latestBid, setLatestBid] = useState(props.data.startPrice);
  const [yourBid, setYourBid] = useState("");
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [positiveFeedback, setPositiveFeedback] = useState("");
  const [negativeFeedback, setNegativeFeedback] = useState("");
  const [positiveButton, setPositiveButton] = useState(false);
  const [negativeButton, setNegativeButton] = useState(false);

  function getLatestBids() {
    axios
      .get("http://localhost:8080/api/bid?id=" + props.data.id, {
        headers: {
          Authorization: window.localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setLatestBid(res.data.price);
      });
  }
  const givePositiveFeedback = () => {
    axios
      .post(
        "http://localhost:8080/api/feedback/user_id/" +
          props.data.seller.id +
          "/item_id/" +
          props.data.id +
          "/outcome/POSITIVE",
        {
          headers: {
            Authorization: window.localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.status === 201) setPositiveButton(true);
      });
  };

  const giveNegativeFeedback = () => {
    axios
      .post(
        "http://localhost:8080/api/feedback/user_id/" +
          props.data.seller.id +
          "/item_id/" +
          props.data.id +
          "/outcome/" +
          "NEGATIVE",
        {
          headers: {
            Authorization: window.localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.status === 201) setNegativeButton(true);
      });
  };
  function getFeedback() {
    axios
      .get(
        "http://localhost:8080/api/feedback/user_id/" + props.data.seller.id,
        {
          headers: {
            Authorization: window.localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setPositiveFeedback(res.data.positiveFeedbacks);
        setNegativeFeedback(res.data.negativeFeedbacks);
      });
  }

  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getLatestBids();
      getFeedback();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  function timeConversion(millisec) {
    var seconds = (millisec / 1000).toFixed(1);

    var minutes = (millisec / (1000 * 60)).toFixed(1);

    var hours = (millisec / (1000 * 60 * 60)).toFixed(1);

    var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

    if (seconds < 60) {
      return Math.floor(seconds) + " sec";
    } else if (minutes < 60) {
      return Math.floor(minutes) + " min";
    } else if (hours < 24) {
      return Math.floor(hours) + " hrs";
    } else {
      return Math.floor(days) + " days";
    }
  }
  function keyPress(e) {
    if (e.keyCode == 13) {
      if (yourBid <= latestBid) {
        setFail(true);
      }
      axios
        .post(
          `http://localhost:8080/api/bid`,
          {
            itemId: props.data.id,
            price: yourBid,
          },
          {
            headers: {
              Authorization: window.localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (res.status === 201) {
            setSuccess(true);
            setYourBid("");
          }
        });
    }
  }
  function isNumber(number) {
    return (
      (number.charCodeAt(number.length - 1) >= 48 &&
        number.charCodeAt(number.length - 1) <= 57) ||
      number === ""
    );
  }
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <Grid item xs={3}>
      <Card>
        <CardContent>
          <Typography
            variant="h5"
            component="h5"
            style={{ textAlign: "center" }}
            color="initial"
          >
            {props.data.bidName}
          </Typography>
          <Typography variant="h6" component="h6" color="initial">
            Start Price: {props.data.startPrice}$
          </Typography>
          <Typography color="initial">
            Ends in: {timeConversion(Date.parse(props.data.end) - new Date())}
          </Typography>
          <Typography variant="body2" component="p" color="initial">
            Category: {props.data.category.categoryName}
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            style={{ textAlign: "center" }}
          >
            Current Price: {latestBid}$
          </Typography>
          <TextField
            id="outlined-basic"
            label="Enter price"
            variant="outlined"
            onKeyDown={(e) => keyPress(e)}
            onChange={(e) => {
              if (isNumber(e.target.value)) {
                setYourBid(e.target.value);
              }
            }}
            value={yourBid}
          />
          <Typography
            color="initial"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            aria-owns={open ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
          >
            Seller: {props.data.seller.username}
          </Typography>
          <Popover
            id="mouse-over-popover"
            className={classes.popover}
            classes={{
              paper: classes.paper,
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            <Typography>Positive Feedback: {positiveFeedback}</Typography>
            <Typography>Negative Feedback: {negativeFeedback}</Typography>
          </Popover>
          <Button
            size="small"
            color="primary"
            variant="contained"
            style={{ margin: "3px" }}
            onClick={givePositiveFeedback}
          >
            Positive
          </Button>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            style={{ margin: "3px" }}
            onclick={giveNegativeFeedback}
          >
            Negative
          </Button>
        </CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Snackbar
              open={success}
              autoHideDuration={6000}
              onClose={() => setSuccess(false)}
            >
              <Alert severity="success">Bid Accepted</Alert>
            </Snackbar>
            <Snackbar
              open={fail}
              autoHideDuration={6000}
              onClose={() => setFail(false)}
            >
              <Alert severity="error">
                Your bid must be higher than the last bid
              </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
