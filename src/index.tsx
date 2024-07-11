import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MainScreen from "./components/main-screen";
import { BrowserRouter } from "react-router-dom";
import { PageEditor } from './ov-extension'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MainScreen />
      <PageEditor />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
