import React, { useState, useEffect, useContext } from 'react';
import './styles/styles.scss';

import Header from "./components/Header.js";
import MyMap from "./components/MyMap.js";
import Sidebar from "./components/Sidebar.js";

import SelectedRestaurantProvider, { SelectedRestaurantContext } from './contexts/SelectedRestaurantContext';

function App() {

  const [data, setData] = useState();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    fetch("https://take-away-si.herokuapp.com/restaurants")
      .then(res => res.json())
      .then(
        (result) => {
          setData(result)
        },
        (error) => {
          console.log(error)
        }
      )
  }, [])

  let visible = isSidebarVisible;
  console.log(visible)
  return (
    <div className="App">
      <Header />
      <main>
        <SelectedRestaurantProvider>
          <MyMap data={data} />
          <div className="Toggle" onClick={() => setIsSidebarVisible(!isSidebarVisible)}>
            <span>{isSidebarVisible ? "Pokaži zemljevid" : "Prikaži vse restavracije"}</span>
          </div>
          <Sidebar visible={isSidebarVisible} data={data} />
        </SelectedRestaurantProvider>
      </main>
    </div>
  );
}

export default App;