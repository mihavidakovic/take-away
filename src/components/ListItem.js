import React from "react";

import Distance from './Distance';
function ListItem(props) {
    return (
        <>
            <div className="List__item--image" style={{
                'backgroundImage': 'url(' + props.data.image + ')'
            }}>
            </div>
            <div className="List__item--info">
                <div className="info__title" title={props.data.title}>
                    <span className="info__title--text">{props.data.title}</span>
                    <span className="item__status item__status--open"></span>
                </div>
                <span className="info__description">
                    {props.data.description}
                </span>
                <Distance location={props.location} restaurantLocation={{lat: props.data.lat, lon: props.data.lon}} />
            </div>
            <div className="List__item--action">
                    <div></div>
                </div>
        </>
    );
}

export default ListItem;