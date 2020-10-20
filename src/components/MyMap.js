import React, { useState, useRef } from "react";
import useSwr from "swr";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";

const fetcher = (...args) => fetch(...args).then(response => response.json());

const Marker = ({ children }) => children;

export default function MyMap(props)  {
    const mapRef = useRef();
    const [bounds, setBounds] = useState(null);
    const [zoom, setZoom] = useState(10);
  
    const url =
    "https://take-away-si.herokuapp.com/restaurants";
  const { data, error } = useSwr(url, { fetcher });
  const restaurants = data && !error ? data.slice(0, 2000) : [];
  const points = restaurants.map(restaurant => ({
    type: "Feature",
    properties: { cluster: false, restaurantId: restaurant._id, category: restaurant.description },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(restaurant.lon),
        parseFloat(restaurant.lat)
      ]
    }
  }));

  console.log(points)
  
    const { clusters, supercluster } = useSupercluster({
      points,
      bounds,
      zoom,
      options: { radius: 75, maxZoom: 20 }
    });
  
    return (
      <div style={{ height: "100vh", width: "100%" }} className="Map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GMAP_API }}
          defaultCenter={{ lat: 46.1437671, lng: 13.8719048 }}
          defaultZoom={8}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map }) => {
            mapRef.current = map;
          }}
          onChange={({ zoom, bounds }) => {
            setZoom(zoom);
            setBounds([
              bounds.nw.lng,
              bounds.se.lat,
              bounds.se.lng,
              bounds.nw.lat
            ]);
          }}
        >
          {clusters.map(cluster => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const {
              cluster: isCluster,
              point_count: pointCount
            } = cluster.properties;
  
            if (isCluster) {
              return (
                <Marker
                  key={`cluster-${cluster.id}`}
                  lat={latitude}
                  lng={longitude}
                >
                  <div
                    className="cluster-marker"
                    style={{
                      width: `${10 + (pointCount / points.length) * 20}px`,
                      height: `${10 + (pointCount / points.length) * 20}px`
                    }}
                    onClick={() => {
                      const expansionZoom = Math.min(
                        supercluster.getClusterExpansionZoom(cluster.id),
                        20
                      );
                      mapRef.current.setZoom(expansionZoom);
                      mapRef.current.panTo({ lat: latitude, lng: longitude });
                    }}
                  >
                    {pointCount}
                  </div>
                </Marker>
              );
            }
  
            return (
              <Marker
                key={`restaurant-${cluster.properties.restaurantId}`}
                lat={latitude}
                lng={longitude}
              >
                <button className="restaurant-marker">
                  <img src="/custody.svg" alt="restaurant doesn't pay" />
                </button>
              </Marker>
            );
          })}
        </GoogleMapReact>
      </div>
    );
  
}
