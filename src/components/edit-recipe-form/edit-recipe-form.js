import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { changeRecipeDispatch, fetchRecipes } from "../../actions";
import { connect } from "react-redux";
import { withBlibService } from "../hoc";
import { compose } from "redux";

import "./edit-recipe-form.css";

class EditRecipeForm extends Component {
  state = {
    open: false,
    recipeName: "",
    description: "",
    shouldUpdate: false
  };

  componentDidMount() {
    const { recipe } = this.props;
    this.setState({
      ...this.state,
      recipeName: recipe.recipename,
      description: recipe.description
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { recipe, fetchRecipes, userId } = this.props;
    if (prevProps !== this.props) {
      this.setState({
        ...this.state,
        recipeName: recipe.recipename,
        description: recipe.description
      });
    }

    if (this.state.shouldUpdate) {
      this.setState({ ...this.state, shouldUpdate: false });
      let timerId = setInterval(() => fetchRecipes(userId), 1000);

      setTimeout(() => {
        clearInterval(timerId);
      }, 1100);
    }
  }

  render() {
    const { open, handleClose, recipe, changeRecipeDispatch } = this.props;
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <form
            className="paper"
            noValidate
            autoComplete="off"
            style={{ margin: "10px" }}
          >
            <TextField
              id="outlined-multiline-flexible"
              label="Recipe Name"
              value={this.state.recipeName}
              onChange={e => this.setState({ recipeName: e.target.value })}
              variant="outlined"
              style={{ width: "300px", margin: "10px" }}
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Discription"
              multiline
              // rowsMax="4"
              value={this.state.description}
              onChange={e => this.setState({ description: e.target.value })}
              variant="outlined"
              style={{ width: "300px", margin: "10px" }}
            />

            <Button
              variant="outlined"
              style={{ margin: "15px" }}
              onClick={() => {
                changeRecipeDispatch(
                  recipe.recipeid,
                  this.state.recipeName,
                  this.state.description
                );
                this.setState({ shouldUpdate: true });
              }}
            >
              Save
            </Button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default compose(
  withBlibService(),
  connect(null, { changeRecipeDispatch, fetchRecipes })
)(EditRecipeForm);
