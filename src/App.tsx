import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import MainScreen from './components/main-screen';

function App() {
  return (
        <div className="App">
          <MainScreen />
        </div>
  );
}

export default App;
