import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Context from "./Contexts/MainContext";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./Store/Reducer/rootReducer";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Provider } from "react-redux";
import Firebase, { FirebaseContext } from "./UsersComponents/Firebase/index";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#033A68",
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <FirebaseContext.Provider value={new Firebase()}>
        <Context>
          <App />
        </Context>
      </FirebaseContext.Provider>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
