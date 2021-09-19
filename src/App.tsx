import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import MainScreen from './components/main-screen';

function App() {
  return (
    <Switch>
      <Route path="/">
        <div className="App">
          Logistic test app

          <MainScreen />
        </div>
      </Route>
    </Switch>
  );
}

export default App;
