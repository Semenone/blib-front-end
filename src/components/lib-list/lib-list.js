import React, { Component } from "react";
import LibListItem from "../lib-list-item";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { withBlibService } from "../hoc";
import { fetchUsers } from "../../actions";
import { compose } from "redux";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import "./lib-list.css";

class LibList extends Component {
  componentDidMount() {
    const { fetchUsers } = this.props;
    fetchUsers();
  }

  render() {
    const { users, loading, error } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }

    return (
      <>
        <Container className="cardGrid" maxWidth="md">
          <Grid container spacing={4}>
            {users.map(user => (
              <LibListItem
                key={user.userid}
                userName={user.username}
                userId={user.userid}
                libId={user.libiduserside}
              />
            ))}
          </Grid>
        </Container>
      </>
    );
  }
}

const mapStateToProps = ({ users, loading, error }) => ({
  users,
  loading,
  error
});

export default compose(
  withBlibService(),
  connect(mapStateToProps, { fetchUsers })
)(LibList);
