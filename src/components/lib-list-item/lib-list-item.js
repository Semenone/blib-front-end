import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { withBlibService } from "../hoc";
import { Link } from "react-router-dom";
import { changeLibIdDispatch } from "../../actions";
import { compose } from "redux";
import "./lib-list-item.css";

class LibListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // openEditWindow: false,
    };
  }

  render() {
    const { userName, libId } = this.props; //  changeLibIdDispatch

    return (
      <>
        <Grid item xs={12} sm={6} md={4}>
          <Card className="card">
            <CardMedia
              className="cardMedia"
              image="https://source.unsplash.com/random"
              title="Image title"
            />
            <CardContent className="cardContent">
              <Typography gutterBottom variant="h5" component="h2">
                Library by <i>{userName}</i>
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={`/library/${libId}`}>
                <Button
                  size="small"
                  color="primary"
                  // onClick={() => changeLibIdDispatch(userName)}
                >
                  View
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = ({ libId }) => ({
  libId
});

export default compose(
  withBlibService(),
  connect(null, { changeLibIdDispatch })
)(LibListItem);
