import React, { useState, useEffect, useContext } from 'react';
import './styles/styles.scss';

import Header from "./components/Header.js";
import MyMap from "./components/MyMap.js";
import List from "./components/List.js";
import SelectedRestaurant from "./components/SelectedRestaurant.js";

import SelectedRestaurantProvider from './contexts/SelectedRestaurantContext';

import { motion } from "framer-motion"

const sidebar = {
    hidden: { 
        opacity: 0,
        y: 10,
        transition: {
            duration: 0.2
        }
    }, 
    visible: { 
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.2
        }
    }
}

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
          <MyMap />
          <div className="Toggle" onClick={() => setIsSidebarVisible(!isSidebarVisible)}>
            <span>{isSidebarVisible ? "Pokaži zemljevid" : "Prikaži vse restavracije"}</span>
          </div>
          <motion.div className={isSidebarVisible ? "Sidebar visible" : "Sidebar"} initial="hidden" animate="visible" variants={sidebar}>
              <SelectedRestaurant />
              <List data={data} />
          </motion.div>
          </SelectedRestaurantProvider>
        </main>
      </div>
  );
}

export default App;