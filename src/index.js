import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./components/app";
import ErrorBoundry from "./components/error-boundry";
import BlibService from "./services/blib-service";
import { BlibServiceProvider } from "./components/blib-service-context";

import store from "./store";

const blipService = new BlibService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <BlibServiceProvider value={blipService}>
        <Router>
          <App />
        </Router>
      </BlibServiceProvider>
    </ErrorBoundry>
  </Provider>,
  document.getElementById("root")
);
