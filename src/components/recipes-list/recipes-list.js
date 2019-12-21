import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withBlibService } from "../hoc";
import { fetchRecipes, addRecipe } from "../../actions";
import { connect } from "react-redux";
import { compose } from "redux";
import Button from "@material-ui/core/Button";

import RecipeListItem from "../recipe-list-item";

import "./recipes-list.css";

class RecipesList extends Component {
  state = {
    recipeId: "",
    recipeName: "",
    description: "",
    componentShouldUpdate: false
  };

  componentDidMount() {
    const { fetchRecipes, userId } = this.props;
    fetchRecipes(userId);
  }

  componentDidUpdate(prevProps, prevState) {
    const { recipes, fetchRecipes, userId } = this.props;

    if (this.state.componentShouldUpdate) {
      this.setState({ componentShouldUpdate: false });
      let timerId = setInterval(() => fetchRecipes(userId), 1000);

      setTimeout(() => {
        clearInterval(timerId);
      }, 1100);
    }
  }

  render() {
    const { userId, products, addRecipe, recipes } = this.props;

    return (
      <div className="root" style={{ marginBottom: "400px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            {recipes.map(recipe => {
              return <RecipeListItem recipe={recipe} userId={userId} />;
            })}
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                addRecipe(userId);
                this.setState({ componentShouldUpdate: true });
              }}
            >
              Add Recipe
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ recipes, libId, userId, products }) => ({
  recipes,
  libId,
  userId,
  products
});

export default compose(
  withBlibService(),
  connect(mapStateToProps, { fetchRecipes, addRecipe })
)(RecipesList);
