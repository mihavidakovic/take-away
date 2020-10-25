import React, { useState, useEffect } from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import MyMap from "../components/MyMap.js";
import Sidebar from "../components/Sidebar.js";

import SelectedRestaurantProvider from '../contexts/SelectedRestaurantContext';

export default function Home() {
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
        <div className="subpage Home">
            <SelectedRestaurantProvider>
                <MyMap data={data} />
                <div className="Toggle" onClick={() => setIsSidebarVisible(!isSidebarVisible)}>
                    <span>{isSidebarVisible ? "Pokaži zemljevid" : "Prikaži vse restavracije"}</span>
                </div>
                <Sidebar visible={isSidebarVisible} data={data} />
            </SelectedRestaurantProvider>
        </div>
    )
}
