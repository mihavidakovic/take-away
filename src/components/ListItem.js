import React from "react";
import { geolocated } from "react-geolocated";

function ListItem(props) {

    function myDistance() {
        if(!props.isGeolocationAvailable) {
            return "Razdalja ni na voljo"
        } else if(!props.isGeolocationEnabled) {
            return "Razdalja onemogočena"
        } else if(props.coords) {
            return "pozicija" + props.coords
        } else {
            return null
        }
    }
    return (
        <>
            <div className="List__item--image" style={{
                'backgroundImage': 'url(' + props.image + ')'
            }}>
            </div>
            <div className="List__item--info">
                <div className="info__title" title={props.title}>
                    <span className="info__title--text">{props.title}</span>
                    <span className="item__status item__status--open"></span>
                </div>
                <span className="info__description">
                    {props.description}
                </span>
                <span>{myDistance()}</span>
            </div>
            <div className="List__item--action">
                    <div></div>
                </div>
        </>
    );
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 1000,
})(ListItem);