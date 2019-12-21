import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./header.css";

import {
  checkAuthenticationFromLocalStorage,
  logOut,
  fetchProducts
} from "../../actions";

const RegLogBar = () => (
  <>
    <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
      <Button color="inherit">Login</Button>
    </Link>

    <Link to="/registration" style={{ textDecoration: "none", color: "white" }}>
      <Button color="inherit">Registration</Button>
    </Link>
  </>
);

const LogOutBar = ({ logOut }) => (
  <IconButton
    onClick={() => logOut()}
    className="logOutButton"
    color="inherit"
    aria-label="logout"
  >
    <ExitToAppIcon />
  </IconButton>
);

const sideList = () => (
  <div className="list" style={{ width: "250px" }} role="presentation">
    <List>
      <Link to="/refrigerator" style={{ textDecoration: "none" }}>
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"refrigerator"} />
        </ListItem>
      </Link>
      <Link to="/recipes" style={{ textDecoration: "none" }}>
        <ListItem button>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary={"recipes"} />
        </ListItem>
      </Link>
    </List>
  </div>
);

class Header extends Component {
  state = {
    menuIsOpen: false
  };

  componentDidMount() {
    const { checkAuthenticationFromLocalStorage } = this.props;
    checkAuthenticationFromLocalStorage();
  }

  render() {
    const { isAuth, logOut, fetchProducts, libId } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <Drawer
            open={this.state.menuIsOpen}
            onClose={() => this.setState({ menuIsOpen: false })}
          >
            {sideList()}
          </Drawer>
          <IconButton
            edge="start"
            className="menuButton"
            color="inherit"
            aria-label="menu"
            onClick={() => this.setState({ menuIsOpen: true })}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h4" className="title">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Plib
            </Link>
          </Typography>

          <Typography
            variant="h5"
            className="title"
            onClick={() => fetchProducts(libId)}
          >
            <Link
              to="/my-library"
              style={{ textDecoration: "none", color: "white" }}
            >
              My Library
            </Link>
          </Typography>

          {isAuth ? <LogOutBar logOut={logOut} /> : <RegLogBar />}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = ({ loginName, isAuth, libId }) => ({
  loginName,
  isAuth,
  libId
});
const mapDispatchToProps = {
  logOut,
  checkAuthenticationFromLocalStorage,
  fetchProducts
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
