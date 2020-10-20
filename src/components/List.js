import React from 'react';
import ListItem from './ListItem';

export default function List(props) {

    if (props.data) {
        return (
            <div className="List">
                {props.data.map((data) => {
                    return (
                        <ListItem title={data.title} description={data.description} image={data.image} />
                    )
                })}
            </div>
        );    
    } else {
        return(
            <div className="List">
                <span className="loading">Nalagam...</span>
            </div>
        )
    }
}