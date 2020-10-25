import React, { useState, useContext, useEffect } from "react";
import { SelectedRestaurantContext } from '../contexts/SelectedRestaurantContext';
import { GoogleMap, useLoadScript, MarkerClusterer, Marker } from '@react-google-maps/api';
import Loader from 'react-loader-spinner'
import marker from "../assets/img/marker.svg";
import m1 from "../assets/img/m1.png";
import m2 from "../assets/img/m2.png";


function MyMap(props) {
  const { SelectedRestaurant, changeSelectedRestaurant } = useContext(SelectedRestaurantContext)
  const [restaurants, setRestaurants] = useState();
  let position = {
    lat: parseFloat(SelectedRestaurant.lon),
    lng: parseFloat(SelectedRestaurant.lat),
    zoom: SelectedRestaurant.zoom
  };


  const clusterImages = [
    {
      url: m1,
      height: 62,
      width: 62,
      fontFamily: "Inter",
      textColor: "#FFF",
      fontSize: 18
    },
    {
      url: m1,
      height: 62,
      width: 62,
      fontFamily: "Inter",
      textColor: "#FFF",
      fontSize: 18
    },
    {
      url: m1,
      height: 62,
      width: 62,
      fontFamily: "Inter",
      textColor: "#FFF",
      fontSize: 18
    },
    {
      url: m2,
      height: 50,
      width: 50,
      fontFamily: "Inter",
      textColor: "#FFF",
      fontSize: 18
    },
    {
      url: m2,
      height: 50,
      width: 50,
      fontFamily: "Inter",
      textColor: "#FFF",
      fontSize: 18
    },
    {
      url: m2,
      height: 50,
      width: 50,
      fontFamily: "Inter",
      textColor: "#FFF",
      textSize: 18
    }
  ]

  function createKey(location) {
    return parseFloat(location.lat) + parseFloat(location.lon)
  }

  useEffect(() => {
    setRestaurants(props.data)
  }, [props.data, SelectedRestaurant])
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GMAP_API,
    mapId: "ea6d22f5e288638"
  })

  const exampleMapStyles = [
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.attraction",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "water",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    }
  ];


  if (restaurants) {
    return (
      <div className="Map">
        <GoogleMap
          id='map'
          zoom={position.zoom}
          center={{ lat: position.lat, lng: position.lng }}
          options={{ styles: exampleMapStyles }}>
          <MarkerClusterer styles={clusterImages}>
            {(clusterer) =>
              restaurants.map((restaurant) => {
                return (
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
                        restaurant.delivery,
                        restaurant.takeover,
                        15,
                        1)
                    }}
                  />

                )
              })
            }
          </MarkerClusterer>
        </GoogleMap>
      </div>
    );
  } else {
    return (
      <div className="Map">
        <Loader
          type="Rings"
          color="#7BA47F"
          height={100}
          width={100}
          className="Loading"
        />
      </div>
    )
  }

}

export default React.memo(MyMap)
