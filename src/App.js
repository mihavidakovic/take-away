import React, { useState, setState, useEffect } from 'react';
import './styles/styles.scss';

import Header from "./components/Header.js";
import MyMap from "./components/MyMap.js";
import List from "./components/List.js";

function App() {

  const [data, setData] = useState();

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
        <MyMap />
        <List data={data} />
      </main>
    </div>
  );
}

export default App;