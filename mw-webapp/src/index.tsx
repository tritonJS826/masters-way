import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import "src/firebase";
import App from "src/App";
import reportWebVitals from "src/reportWebVitals";
import "src/index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);


root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// To log results (for example: reportWebVitals(console.log))
// Or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
