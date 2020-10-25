import React, {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './styles/styles.scss';
import ReactGA from 'react-ga';

import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";

import Header from "./components/Header.js";

import Home from "./pages/Home.js";
import Add from "./pages/Add.js";
import Admin from "./pages/Admin/Admin.js";
import Manage from "./pages/Admin/Manage/Manage.js";
import Edit from "./pages/Admin/Edit/Edit.js";

function App() {


  useEffect(() => {
    ReactGA.initialize('UA-133841417-2'); // put your tracking id here
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [])

  return (
    <Router>
      <Auth0ProviderWithHistory>
        <div className="App">
          <Header />
          <main>
            <Switch>
              <Route exact path="/" children={<Home />} />
              <Route path="/dodaj" children={<Add />} />
              <Route exact path="/administracija" children={<Admin />} />
              <Route exact path="/administracija/urejanje" children={<Manage />} />
              <Route exact path="/administracija/urejanje/:id" children={<Edit />} />
            </Switch>
          </main>
        </div>
      </Auth0ProviderWithHistory>
    </Router>
  );
}

export default App;