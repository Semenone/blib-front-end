import React, { Component } from "react";
import { withBlibService } from "../hoc";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { fetchLogin, fetchRegistration } from "../../actions";
import { Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import "./login-form.css";

class LoginForm extends Component {
  state = {
    login: undefined,
    password: undefined
  };

  render() {
    const { variant, isAuth } = this.props;
    if (isAuth) {
      return <Redirect to="/" />;
    }
    return (
      <Container component="main" style={{ minHeight: "500px" }} maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            style={{ textAlign: "center" }}
          >
            {variant === "login" ? "Sign In" : "Sing Up"}
          </Typography>
          <form className="form" noValidate>
            <TextField
              onChange={e => this.setState({ login: e.target.value })}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Login"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={e => this.setState({ password: e.target.value })}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {variant === "login" ? (
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            ) : (
              ""
            )}

            <Button
              onClick={e => {
                e.preventDefault();
                if (
                  this.state.login === undefined ||
                  this.state.password === undefined
                ) {
                  alert("Заполните данные");
                } else {
                  if (variant === "login") {
                    this.props.fetchLogin(
                      this.state.login,
                      this.state.password
                    );
                  } else {
                    this.props.fetchRegistration(
                      this.state.login,
                      this.state.password
                    );
                    this.props.history.push("/login");
                  }
                }
              }}
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
            >
              {variant === "login" ? "Sign In" : "Sing Up"}
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  href={variant === "login" ? "/registration" : "/login"}
                  variant="body2"
                >
                  {variant === "login"
                    ? "Don't have an account? Sign Up"
                    : "Sing In"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}></Box>
      </Container>
    );
  }
}

const mapStateToProps = ({ isAuth, loginName }) => {
  return { isAuth, loginName };
};

export default compose(
  withRouter,
  withBlibService(),
  connect(mapStateToProps, { fetchLogin, fetchRegistration })
)(LoginForm);
