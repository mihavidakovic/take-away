import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

export default function MyMap(props)  {
    const [data, setData] = useState({
        center: {
            lat: 46.1662128,
            lng: 14.997597
          },
          zoom: 8.7
    })

    return (
        <div className="Map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GMAP_API }}
          defaultCenter={data.center}
          defaultZoom={data.zoom}
        >
        </GoogleMapReact>
        </div>
    );
}
