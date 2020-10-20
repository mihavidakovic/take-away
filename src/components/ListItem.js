import React from "react";

export default function ListItem(props) {
    return (
        <div className="List__item">
            <div className="List__item--image" style={{
                'backgroundImage': 'url(' + props.image + ')'
            }}>
                <div className="List__item--status status__open"></div>
            </div>
            <div className="List__item--info">
                <span className="info__title" title={props.title}>
                    {props.title}
                </span>
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
