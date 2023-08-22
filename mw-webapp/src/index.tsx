import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
// import {AppContext} from "src/appContext";
// import firebase from "firebase/compat/app";
import App from "src/App";
import reportWebVitals from "src/reportWebVitals";
import "src/index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);


root.render(
  // <AppContext.Provider value={{firebase}}>
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  // </AppContext.Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();