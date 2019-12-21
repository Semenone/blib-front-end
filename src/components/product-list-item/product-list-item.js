import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Box from "@material-ui/core/Box";
import EditForm from "../edit-form";
import { connect } from "react-redux";
import { withBlibService } from "../hoc";
import {
  changeParentPage,
  fetchProducts,
  removeProductFromLib
} from "../../actions";
import { compose } from "redux";
import "./product-list-item.css";

class ProductListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openEditWindow: false,
      shouldUpdate: false,
      isEdit: true
    };
  }

  componentDidMount() {
    const { libId, paramsLibId } = this.props;
    if (libId !== paramsLibId && !!paramsLibId) {
      this.setState({ isEdit: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { fetchProducts, libId, paramsLibId } = this.props;

    if (this.state.shouldUpdate) {
      this.setState({ ...this.state, shouldUpdate: false });
      let timerId = setInterval(() => fetchProducts(libId), 1000);

      setTimeout(() => {
        clearInterval(timerId);
      }, 1100);
    }
  }

  handleEditOpen = () => {
    this.setState({
      ...this.state,
      openEditWindow: true
    });
  };

  handleEditClose = () => {
    console.log("close");
    this.setState({
      openEditWindow: false
    });
  };

  render() {
    const {
      product,
      changeParentPage,
      removeProductFromLib,
      fetchProducts
    } = this.props;
    const {
      title,
      description,
      price,
      fridge,
      stars,
      parent,
      productid,
      libid
    } = product; // productId, libId,title,description, fridge, price,stars,parent, tag1,tag2, tag3
    console.log(libid)
    return (
      <>
        <EditForm
          open={this.state.openEditWindow}
          handleClose={this.handleEditClose}
          product={product}
          fetchProducts={fetchProducts}
          libId={libid}
        />
        <Grid item xs={12} sm={6} md={4}>
          <Card className="card">
            <CardMedia
              className="cardMedia"
              image="https://source.unsplash.com/random"
              title="Image title"
              onClick={() => {
                changeParentPage(title, parent);
              }}
            />
            <CardContent className="cardContent">
              <Typography gutterBottom variant="h5" component="h2">
                {!!title ? title : ""}
              </Typography>
              {!!stars ? (
                <Box borderColor="transparent">
                  <Rating name="read-only" value={stars} readOnly />
                </Box>
              ) : (
                ""
              )}
              <Typography>
                {!!description ? "Description: " + description : ""}
              </Typography>
              <Typography>{!!fridge ? "Fridge: " + fridge : ""}</Typography>
              <Typography>{!!price ? "Price: " + price : ""}</Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  changeParentPage(title, parent);
                }}
              >
                View
              </Button>
              {this.state.isEdit ? (
                <Button
                  size="small"
                  color="primary"
                  onClick={this.handleEditOpen}
                >
                  Edit
                </Button>
              ) : (
                ""
              )}

              {this.state.isEdit ? (
                <IconButton
                  aria-label="delete"
                  className="btn-delete"
                  size="small"
                  style={{ marginLeft: "35%" }}
                  onClick={() => {
                    removeProductFromLib(productid, libid);
                    this.setState({ shouldUpdate: true });
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              ) : (
                ""
              )}
            </CardActions>
          </Card>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = ({ currentParentPage }) => ({
  currentParentPage
});

export default compose(
  withBlibService(),
  connect(mapStateToProps, {
    changeParentPage,
    removeProductFromLib,
    fetchProducts
  })
)(ProductListItem);
