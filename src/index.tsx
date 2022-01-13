import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MainScreen from "./components/main-screen";
import { BrowserRouter } from "react-router-dom";

// import ONE VISION
import { ClickListener } from "./ov-extension";

ReactDOM.render(
  <React.StrictMode>
    <ClickListener>
      <BrowserRouter>
        <MainScreen />
      </BrowserRouter>
    </ClickListener>
  </React.StrictMode>,
  document.getElementById("root")
);
