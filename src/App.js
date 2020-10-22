import React, { useState, useEffect } from 'react';
import './styles/styles.scss';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import Header from "./components/Header.js";
import MyMap from "./components/MyMap.js";
import Sidebar from "./components/Sidebar.js";

import SelectedRestaurantProvider from './contexts/SelectedRestaurantContext';

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