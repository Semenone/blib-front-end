import React, { Component } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeRecipe, fetchRecipes } from "../../actions";
import { connect } from "react-redux";
import { compose } from "redux";
import { withBlibService } from "../hoc";
import EditRecipeForm from "../edit-recipe-form";
import "./recipe-list-item.css";

class RecipeListItem extends Component {
  state = {
    openEditWindow: false,
    shouldUpdate: false
  };

  componentDidUpdate(prevProps, prevState) {
    const { fetchRecipes, userId } = this.props;

    if (this.state.shouldUpdate) {
      this.setState({ ...this.state, shouldUpdate: false });
      let timerId = setInterval(() => fetchRecipes(userId), 1000);

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
    this.setState({
      openEditWindow: false
    });
  };

  render() {
    const { recipe, removeRecipe, userId } = this.props;
    console.log(recipe);
    return (
      <>
        <EditRecipeForm
          open={this.state.openEditWindow}
          handleClose={this.handleEditClose}
          recipe={recipe}
          fetchRecipes={fetchRecipes}
          userId={userId}
        />
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header"
          >
            <div class="column">
              <Typography className="heading">Recipe name</Typography>
            </div>
            <div class="column">
              <Typography className="heading">Descriprion</Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="details">
            <div className="column">
              <Typography variant="h5">{recipe.recipename}</Typography>
            </div>
            <div className="column">
              <Typography variant="p" className="description">
                {recipe.description}
              </Typography>
            </div>
            <div className="column">
              <Button
                variant="outlined"
                color="primary"
                onClick={this.handleEditOpen}
              >
                Edit
              </Button>
              <IconButton
                aria-label="delete"
                style={{ margin: "10px" }}
                onClick={() => {
                  removeRecipe(recipe.recipeid);
                  this.setState({ shouldUpdate: true });
                }}
              >
                <DeleteIcon fontSize="large" />
              </IconButton>
            </div>
          </ExpansionPanelDetails>
          <Divider />
        </ExpansionPanel>
      </>
    );
  }
}

// const mapStateToProps = ({ recipes, libId, userId, products }) => ({
//   recipes,
//   libId,
//   userId,
//   products
// });

export default compose(
  withBlibService(),
  connect(null, { removeRecipe, fetchRecipes })
)(RecipeListItem);
