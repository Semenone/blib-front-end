import BlibService from "../services/blib-service";

const blibServise = new BlibService();

export const changeParentPage = (...args) => ({
  type: "CHANGE_CURRENT_PARENT_PAGE",
  payload: args
});

const changeProduct = () => ({
  type: "CHANGE_PRODUCT"
});

const changeLibId = libId => ({
  type: "CHANGE_LIB_ID",
  payload: libId
});

const productsRequested = () => ({
  type: "FETCH_PRODUCTS_REQUEST"
});

const productsLoaded = newProducts => ({
  type: "FETCH_PRODUCTS_SUCCESS",
  payload: newProducts
});

const productsError = error => ({
  type: "FETCH_PRODUCTS_FAILURE",
  payload: error
});

const frigeRequested = () => ({
  type: "FETCH_FRIGE_REQUEST"
});

const frigeLoaded = newFrige => ({
  type: "FETCH_FRIGE_SUCCESS",
  payload: newFrige
});

const removeFrigeRequest = () => ({
  type: "REMOVE_FRIGE_REQUEST"
});

const frigeRemoved = () => ({
  type: "REMOVE_FRIGE_SUCCESS"
});

const recipesRequested = () => ({
  type: "FETCH_RECIPE_REQUEST"
});

const recipesLoaded = newRecipes => ({
  type: "FETCH_RECIPE_SUCCESS",
  payload: newRecipes
});

const recipeAdded = () => ({
  type: "ADD_RECIPE_SUCCESS"
});

const recipeRemoved = () => ({
  type: "REMOVE_RECIPE_SUCCESS"
});

const recipeChanged = () => ({
  type: "CHANGE_RECIPE_SUCCESS"
});

const usersRequested = () => ({
  type: "FETCH_USERS_REQUEST"
});

const usersLoaded = users => ({
  type: "FETCH_USERS_SUCCESS",
  payload: users
});

const registrationUser = data => ({
  type: "POST_USER_CREATE",
  payload: data
});

export const checkAuthenticationFromLocalStorage = () => ({
  type: "CHECK_AUTHENTICATION_FROM_LOCAL_STORAGE"
});

const correctLogin = (...args) => ({
  type: "POST_LOGIN_SUCCESS",
  payload: args
});

const wrongLogin = () => ({
  type: "POST_LOGIN_WRONG",
  payload: "Неправильный логин или пароль"
});

export const logOut = () => ({
  type: "FETCH_LOG_OUT"
});

const loginError = error => ({
  type: "POST_LOGIN_FAILURE",
  payload: error
});

const addProductRequest = () => ({
  type: "ADD_PRODUCTS_REQUEST"
});

const productsAdded = () => ({
  type: "ADD_PRODUCTS_SUCCESS"
});

const removeProductRequest = () => ({
  type: "REMOVE_PRODUCT_REQUEST"
});

const productRemoved = () => ({
  type: "REMOVE_PRODUCT_SUCCESS"
});

const fetchLogin = (login, pass) => dispatch => {
  blibServise
    .logIn(login, pass)
    .then(e => {
      if (e.data[0].username) {
        dispatch(
          correctLogin(
            e.data[0].username,
            e.data[0].userid,
            e.data[0].libiduserside
          )
        );
      } else {
        dispatch(wrongLogin());
      }
    })
    .catch(err => dispatch(loginError(err)));
};

const fetchRegistration = (login, pass) => dispatch => {
  blibServise
    .registration(login, pass)
    .then(e => {
      dispatch(registrationUser(e.data[0]));
    })
    .catch(err => dispatch(loginError(err)));
};

const changeProductDispatch = (
  productid,
  title,
  description,
  price,
  stars,
  parent,
  fridge
) => dispatch => {
  blibServise
    .changeProduct(productid, title, description, price, stars, parent, fridge)
    .then(e => {
      dispatch(changeProduct());
    })
    .catch(err => dispatch(loginError(err)));
};

const changeLibIdDispatch = userName => dispatch => {
  dispatch(usersRequested());
  blibServise
    .getLibIdByUserId(userName)
    .then(e => dispatch(changeLibId(e)))
    .catch(err => dispatch(productsError(err)));
};

const fetchUsers = () => dispatch => {
  dispatch(usersRequested());
  blibServise
    .getAllUsers()
    .then(e => dispatch(usersLoaded(e)))
    .catch(err => dispatch(productsError(err)));
};

const fetchProducts = libId => dispatch => {
  dispatch(productsRequested());
  blibServise
    .getProductsByLibId(libId)
    .then(e => dispatch(productsLoaded(e)))
    .catch(err => dispatch(productsError(err)));
};

const fetchFrige = libId => dispatch => {
  dispatch(frigeRequested());
  blibServise
    .getFrige(libId)
    .then(e => dispatch(frigeLoaded(e)))
    .catch(err => dispatch(productsError(err)));
};

const fetchRecipes = userId => dispatch => {
  dispatch(recipesRequested());
  blibServise
    .getRecipesByUserId(userId)
    .then(e => dispatch(recipesLoaded(e)))
    .catch(err => dispatch(productsError(err)));
};

const addRecipe = userId => dispatch => {
  blibServise
    .addRecipe(userId)
    .then(dispatch(productsAdded()))
    .catch(err => dispatch(productsError(err)));
};

const removeRecipe = recipeId => dispatch => {
  blibServise
    .removeRecipe(recipeId)
    .then(dispatch(recipeRemoved()))
    .catch(err => dispatch(productsError(err)));
};

const changeRecipeDispatch = (
  recipeId,
  recipeName,
  description
) => dispatch => {
  blibServise
    .changeRecipe(recipeId, recipeName, description)
    .then(dispatch(recipeChanged()))
    .catch(err => dispatch(productsError(err)));
};

const removeProductFromFrigeDispatch = productId => dispatch => {
  blibServise
    .removeProductfromFrige(productId)
    .then(dispatch(frigeRemoved()))
    .catch(err => dispatch(productsError(err)));
};

const addProductToLib = (libId, parent) => dispatch => {
  dispatch(addProductRequest());
  blibServise
    .addProductToLib(libId, parent)
    .then(dispatch(productsAdded()))
    .catch(err => dispatch(productsError(err)));
};

const removeProductFromLib = (productId, libId) => dispatch => {
  dispatch(removeProductRequest());
  blibServise
    .removeProductfromLib(productId)
    .then(dispatch(productRemoved()))
    .catch(err => dispatch(productsError(err)));
};

export {
  fetchProducts,
  fetchUsers,
  fetchLogin,
  fetchRegistration,
  fetchFrige,
  removeProductFromFrigeDispatch,
  changeProductDispatch,
  changeLibIdDispatch,
  addProductToLib,
  removeProductFromLib,
  fetchRecipes,
  addRecipe,
  removeRecipe,
  changeRecipeDispatch
};
