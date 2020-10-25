import React from 'react'

function Distance(props) {      
    function _getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth  in kilometers
        var dLat = deg2rad(lat2 - lat1); // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in KM
        return Math.round(d * 10) / 10;
      }
      function deg2rad(deg) {
        return deg * (Math.PI / 180)
      }

      console.log(props.location.lat)
        if(props.restaurantLocation.lat && props.restaurantLocation.lon && props.location.lat && props.location.lat) {

                  return (
            <>
                <span className="info__distance">{_getDistanceFromLatLonInKm(props.location.lat, props.location.lon, props.restaurantLocation.lon, props.restaurantLocation.lat)}km stran</span>
            </>
        )
    } else {
        return (
            <>
                <span className="info__distance info__distance--empty"></span>
            </>
        )
    }
}

export default Distance
