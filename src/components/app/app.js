import React from "react";
import "./app.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Footer from "../footer";
import Header from "../header";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  LibraryPage,
  RefrigeratorPage,
  RecipesPage
} from "../pages";

const App = ({ isAuth, messageForModalWindow }) => {
  return (
    <div className="main">
      <Header />
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route
          exact
          path="/my-library"
          render={() =>
            isAuth ? (
              <Route path="/my-library" component={LibraryPage} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />

        <Route
          path="/library/:libId"
          render={() =>
            isAuth ? (
              <Route path="/library/:libId" component={LibraryPage} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />

        <Route
          exact
          path="/refrigerator"
          render={() =>
            isAuth ? (
              <Route path="/refrigerator" component={RefrigeratorPage} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />

        <Route
          exact
          path="/recipes"
          render={() =>
            isAuth ? (
              <Route path="/recipes" component={RecipesPage} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />

        <Route path="/login" component={LoginPage} />
        <Route path="/registration" component={RegisterPage} />
      </Switch>
      <Footer />
    </div>
  );
};

const mapStateToProps = ({ isAuth, messageForModalWindow }) => ({
  isAuth,
  messageForModalWindow
});

export default connect(mapStateToProps)(App);
