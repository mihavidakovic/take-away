import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './styles/styles.scss';

import Header from "./components/Header.js";

import Home from "./pages/Home.js";
import Add from "./pages/Add.js";
import Manage from "./pages/Admin/Manage/Manage.js";

function App() {

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Switch>
            <Route exact path="/" children={<Home />} />
            <Route path="/dodaj" children={<Add />} />
            <Route path="/urejanje" children={<Manage />} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;