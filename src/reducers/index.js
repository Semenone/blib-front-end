const initialState = {
  isAuth: false,
  loginName: "",
  userId: "",
  libId: "",
  products: [],
  users: [],
  frige: [],
  recipes: [],
  loading: true,
  error: null,
  currentPage: "",
  prevPage: "",
  messageForModalWindow: ""
};

const checkAuth = state => {
  const id = localStorage.getItem("userId");
  const login = localStorage.getItem("loginName");
  const libId = localStorage.getItem("libId");
  if (login && id) {
    return {
      ...state,
      loginName: login,
      userId: id,
      libId: libId,
      isAuth: true
    };
  }
  return state;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null
      };

    case "FETCH_PRODUCTS_SUCCESS":
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null
      };

    case "FETCH_PRODUCTS_FAILURE":
      return {
        ...state,
        products: [],
        loading: false,
        error: action.payload
      };

    case "FETCH_FRIGE_REQUEST":
      return {
        ...state,
        loading: true,
        error: null
      };

    case "REMOVE_FRIGE_REQUEST":
      return {
        ...state,
        loading: true
      };

    case "REMOVE_FRIGE_SUCCESS":
      return {
        ...state,
        loading: false
      };

    case "FETCH_FRIGE_SUCCESS":
      return {
        ...state,
        frige: action.payload,
        loading: false,
        error: null
      };

    case "FETCH_RECIPE_REQUEST":
      return {
        ...state,
        loading: true,
        error: null
      };

    case "FETCH_RECIPE_SUCCESS":
      return {
        ...state,
        recipes: action.payload,
        loading: false,
        error: null
      };

    case "FETCH_USERS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null
      };

    case "FETCH_USERS_SUCCESS":
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null
      };

    case "POST_USER_CREATE":
      return {
        ...state,
        messageForModalWindow: action.payload
      };

    case "POST_LOGIN_SUCCESS":
      localStorage.setItem("userId", action.payload[1]);
      localStorage.setItem("loginName", action.payload[0]);
      localStorage.setItem("libId", action.payload[2]);
      return {
        ...state,
        loginName: action.payload[0],
        userId: `${action.payload[1]}`,
        libId: action.payload[2],
        isAuth: true,
        messageForModalWindow: "Теперь вы можете использовать свою библиотеку",
        loading: false,
        error: null
      };

    case "CHECK_AUTHENTICATION_FROM_LOCAL_STORAGE":
      return checkAuth(state);

    case "POST_LOGIN_FAILURE":
      return {
        ...state,
        loginName: "",
        isAuth: false,
        loading: false,
        error: action.payload
      };

    case "POST_LOGIN_WRONG":
      return {
        ...state,
        messageForModalWindow: action.payload
      };

    case "FETCH_LOG_OUT":
      localStorage.clear();
      return {
        ...state,
        loginName: "",
        isAuth: false
      };

    case "ADD_PRODUCTS_REQUEST":
      return {
        ...state,
        loading: true
      };

    case "ADD_PRODUCTS_SUCCESS":
      return {
        ...state,
        loading: false
      };

    case "REMOVE_PRODUCT_REQUEST":
      return {
        ...state,
        loading: true
      };

    case "REMOVE_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false
      };

    case "CHANGE_LIB_ID":
      // localStorage.setItem("libId", action.payload);
      return {
        ...state,
        libId: action.payload,
        loading: false
      };

    case "CHANGE_CURRENT_PARENT_PAGE":
      return {
        ...state,
        currentPage: action.payload[0],
        prevPage: action.payload[1]
      };

    case "CHANGE_PRODUCT":
      return {
        ...state,
        messageForModalWindow: "product changed"
      };

    default:
      return state;
  }
};

export default reducer;
