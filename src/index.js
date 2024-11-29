import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Components/App/App";
import { Provider } from "react-redux";
import Reducer from "./reducer";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={Reducer()}>
      <App />
    </Provider>
  </React.StrictMode>,
);
