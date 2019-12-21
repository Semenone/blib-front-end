const axios = require("axios");

const _apiBase = "http://localhost:8080";

export default class BlibService {
  getProductsByLibId = async libId => {
    // args: libId
    try {
      const response = await axios.get(`${_apiBase}/library/showone/${libId}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  logIn = async (username, pass) => {
    const res = await axios
      .post(`${_apiBase}/login/`, {
        username: username,
        pass: pass
      })
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        console.log(error);
      });
    return res;
  };

  registration = async (username, pass) => {
    const res = await axios
      .post(`${_apiBase}/registration/`, {
        username: username,
        pass: pass
      })
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        console.log(error);
      });
    return res;
  };

  getAllUsers = async () => {
    try {
      const response = await axios.get(`${_apiBase}/users`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  getFrige = async libId => {
    try {
      const response = await axios.get(`${_apiBase}/fridge/show/${libId}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  getRecipesByUserId = async userId => {
    try {
      const response = await axios.get(`${_apiBase}/recipe/show/${userId}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  addRecipe = async userId => {
    const res = await axios
      .post(`${_apiBase}/recipe/add`, {
        userid: userId,
        recipename: "",
        description: ""
      })
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        console.log(error);
      });
    return res;
  };

  removeRecipe = async recipeId => {
    const res = await axios
      .post(`${_apiBase}/recipe/delete`, {
        recipeid: recipeId
      })
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        console.log(error);
      });
    return res;
  };

  changeRecipe = async (recipeId, recipeName, description) => {
    console.log(recipeId, recipeName, description);
    const res = await axios
      .post(`${_apiBase}/recipe/edit`, {
        recipeid: recipeId,
        recipename: recipeName,
        description: description
      })
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        console.log(error);
      });
    return res;
  };

  removeProductfromFrige = async productId => {
    const res = await axios
      .post(`${_apiBase}/fridge/delete`, {
        productid: productId
      })
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        console.log(error);
      });
    return res;
  };

  getLibIdByUserId = async userName => {
    try {
      const response = await axios.get(`${_apiBase}/showlibid/${userName}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  changeProduct = async (
    productid,
    title,
    description,
    price,
    stars,
    parent,
    fridge
  ) => {
    console.log(productid, "changed");
    const res = await axios
      .post(`${_apiBase}/product/edit`, {
        productid: productid,
        title: title,
        description: description,
        price: price,
        stars: stars,
        parent: parent,
        tag1: "",
        tag2: "",
        tag3: "",
        fridge: fridge
      })
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        console.log(error);
      });
    return res;
  };

  addProductToLib = async (libId, parent) => {
    const res = await axios
      .post(`${_apiBase}/library/parentadd`, {
        libid: libId,
        parent: parent
      })
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        console.log(error);
      });
    return res;
  };

  removeProductfromLib = async productId => {
    const res = await axios
      .post(`${_apiBase}/product/delete`, {
        productid: productId
      })
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        console.log(error);
      });
    return res;
  };
}
