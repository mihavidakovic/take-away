import React, { useState, setState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';

function Map(props) {

    const [data, setData] = useState({
        center: {
            lat: 59.95,
            lng: 30.33
          },
          zoom: 11
    })

    return (
        <div className="Map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDml5RixRjykZ_s4C-rfd2FXCFt0q2y_Z8" }}
          defaultCenter={data.center}
          defaultZoom={data.zoom}
        >
        </GoogleMapReact>
        </div>
    );
}

export default Map;