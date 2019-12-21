import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "./edit-form.css";
import { Button } from "@material-ui/core";
import { changeProductDispatch } from "../../actions";
import { connect } from "react-redux";
import { withBlibService } from "../hoc";
import { compose } from "redux";

class EditForm extends Component {
  state = {
    open: false,
    title: "",
    description: "",
    price: "",
    fridge: false,
    stars: 0,
    shouldUpdate: false
  };

  componentDidMount() {
    const { product } = this.props;
    this.setState({
      ...this.state,
      title: product.title,
      description: product.description,
      price: product.price,
      fridge: product.fridge,
      stars: product.stars
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { fetchProducts, libId, product } = this.props;
    if (prevProps !== this.props) {
      this.setState({
        ...this.state,
        title: product.title,
        description: product.description,
        price: product.price,
        fridge: product.fridge,
        stars: product.stars
      });
    }

    if (this.state.shouldUpdate) {
      this.setState({ ...this.state, shouldUpdate: false });
      let timerId = setInterval(() => fetchProducts(libId), 1000);

      setTimeout(() => {
        clearInterval(timerId);
      }, 1100);
    }
  }

  render() {
    const { open, handleClose, changeProductDispatch, product } = this.props;
    const { productid, parent } = product;
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div className="paper">
            <h2 id="simple-modal-title">Edit product {this.state.title}</h2>
            <TextField
              id="outlined-basic"
              label="title"
              variant="outlined"
              value={this.state.title}
              multiline
              onChange={e => this.setState({ title: e.target.value })}
            />
            <TextField 
              id="outlined-basic"
              label="description"
              variant="outlined"
              value={this.state.description}
              multiline
              onChange={e => this.setState({ description: e.target.value })}
            />
            <div  style={{position : "absolute", top : "82px", right : "20px"}}>
            <TextField
              id="price"
              type="number"
              label="price"
              variant="outlined"
              value={this.state.price}
              onChange={e => this.setState({ price: e.target.value })}
            />
            </div>
            <div  style={{position : "absolute", top : "240px", right : "70px"}}>
            <Box component="fieldset" borderColor="transparent">
              <Typography component="legend">Rating</Typography>
              <Rating
                name="simple-controlled"
                value={this.state.stars}
                onChange={(event, newValue) => {
                  this.setState({ ...this.state, stars: newValue });
                }}
              />
            </Box>
            </div>
            <div  style={{position : "absolute", top : "180px", right : "120px"}}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.fridge}
                  onChange={() => {
                    this.setState({
                      ...this.state,
                      fridge: !this.state.fridge
                    });
                  }}
                  color="primary"
                />
              }
              label="Frige"
            />
            </div>
            <div  style={{position : "absolute", bottom : "30px", right : "70px"}}>
            <Button
              onClick={() => {
                changeProductDispatch(
                  productid,
                  this.state.title,
                  this.state.description,
                  this.state.price,
                  this.state.stars,
                  parent,
                  this.state.fridge
                );
                this.setState({ shouldUpdate: true });
              }}
            >
              Submit changes
            </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default compose(
  withBlibService(),
  connect(null, { changeProductDispatch })
)(EditForm);
