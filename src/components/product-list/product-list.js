import React, { Component } from "react";
import ProductListItem from "../product-list-item";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import { withBlibService } from "../hoc";
import {
  fetchProducts,
  changeParentPage,
  addProductToLib
} from "../../actions";
import { compose } from "redux";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import "./product-list.css";

class ProductList extends Component {
  state = {
    shouldUpdate: false
  };

  componentDidMount() {
    const { fetchProducts, changeParentPage, libId, match } = this.props;
    const { params } = match;
    !!params.libId ? fetchProducts(params.libId) : fetchProducts(libId);
    changeParentPage("main", "main");
  }

  componentDidUpdate(prevProps, prevState) {
    const { fetchProducts, libId } = this.props;

    if (this.state.shouldUpdate) {
      this.setState({ ...this.state, shouldUpdate: false });
      let timerId = setInterval(() => fetchProducts(libId), 1000);

      setTimeout(() => {
        clearInterval(timerId);
      }, 1100);
    }
  }

  render() {
    const {
      products,
      libId,
      loading,
      error,
      changeParentPage,
      currentPage,
      prevPage,
      addProductToLib
    } = this.props;
    console.log(products);
    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorIndicator />;
    }
    return (
      <>
        <Button
          className="btn-back"
          style={{ position: "absolute" , top : "63px", right : "0px"}}
          onClick={() => {
            changeParentPage(
              prevPage,
              !!products.find(item => item.title === prevPage)
                ? products.find(item => item.title === prevPage).parent
                : "main"
            );
          }}
        >
          Back
        </Button>

        <Container className="cardGrid" maxWidth="md">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Tooltip
                title="Add"
                aria-label="add"
                style={{ margin: "116px" }}
                onClick={() => {
                  addProductToLib(libId, currentPage);
                  this.setState({ ...this.state, shouldUpdate: true });
                }}
              >
                <Fab color="primary">
                  <AddIcon />
                </Fab>
              </Tooltip>
            </Grid>
            {products
              .filter(product => {
                if (product.parent === currentPage) {
                  return product;
                }
              })
              .map(product => (
                <ProductListItem
                  key={product.productId}
                  product={product}
                  libId={libId}
                  paramsLibId={this.props.match.params.libId}
                  // shouldUpdate={this.state.shouldUpdate}
                />
              ))}
          </Grid>
        </Container>
      </>
    );
  }
}

const mapStateToProps = ({
  products,
  loading,
  currentPage,
  prevPage,
  libId,
  error
}) => ({
  products,
  libId,
  loading,
  currentPage,
  prevPage,
  error
});

export default compose(
  withRouter,
  withBlibService(),
  connect(mapStateToProps, { fetchProducts, changeParentPage, addProductToLib })
)(ProductList);
