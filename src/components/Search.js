import React from "react";
import { FaSearch } from 'react-icons/fa';

export function Search(props) {

    function handleValueChange(event) {
        props.onChange(event.target.value)
    }

    return (
        <div className="Search">
            <FaSearch className="Search__icon" />
            <input type="text" placeholder="Išči" value={props.value} onChange={handleValueChange} />
        </div>
    );
}
