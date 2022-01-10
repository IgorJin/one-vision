import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MainScreen from './components/main-screen';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MainScreen />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
