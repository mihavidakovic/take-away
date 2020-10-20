import React from "react";

export default function ListItem(props) {
    return (
        <div className="List__item">
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
            </div>
            <div className="List__item--action">
                    <div></div>
                </div>
        </div>
    );
}
