import React, { useState, useRef, useContext, useEffect } from "react";
import {SelectedRestaurantContext} from '../contexts/SelectedRestaurantContext';
import { GoogleMap, LoadScript, MarkerClusterer, Marker } from '@react-google-maps/api';
import marker from "../assets/img/marker.svg";


function MyMap(props) {
  const {SelectedRestaurant, changeSelectedRestaurant} = useContext(SelectedRestaurantContext)
  const [restaurants, setRestaurants] = useState();
  let position = { 
    lat: parseFloat(SelectedRestaurant.lon), 
    lng: parseFloat(SelectedRestaurant.lat),
    zoom: SelectedRestaurant.zoom
  };
  const mapContainerStyle = {
    height: '400px',
    width: '800px',
  }

  
  const options = {
    imagePath:
      'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
  }
  
  function createKey(location) {
    return parseFloat(location.lat) + parseFloat(location.lon)
  }
  function handleSelectRestaurant(id, title, description, image, tel, lon, lat, zoom, visible) {
    changeSelectedRestaurant(id, title, description, image, tel, lon, lat, zoom, visible)
  }

  useEffect(() => {
    setRestaurants(props.data)
  }, [props.data, SelectedRestaurant])


  if(restaurants) {
    return (
      <div className="Map">
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GMAP_API}
          language="sl"
        >
        <GoogleMap id='map' zoom={position.zoom} center={{lat: position.lat, lng: position.lng}}>
          <MarkerClusterer options={options}>
            {(clusterer) =>
              restaurants.map((restaurant) => {
                console.log(SelectedRestaurant.visible)
                return(
                  <Marker 
                    key={createKey(restaurant)} 
                    position={{
                      lat: parseFloat(restaurant.lon),
                      lng: parseFloat(restaurant.lat)
                    }}
                    cursor="pointer"
                    icon={marker}
                    clusterer={clusterer} 
                    onClick={() => {
                      changeSelectedRestaurant(
                        restaurant._id, 
                        restaurant.title, 
                        restaurant.description, 
                        restaurant.image, 
                        restaurant.tel, 
                        restaurant.lon, 
                        restaurant.lat, 
                        15, 
                        1)
                    }} 
                    />
  
                )
              })
            }
          </MarkerClusterer>
        </GoogleMap>
        </LoadScript>
      </div>
    );  
  } else {
    return(
      <>
        <span>loading</span>
      </>
    )
  }

}

export default React.memo(MyMap)
