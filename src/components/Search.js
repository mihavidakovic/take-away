import React from "react";
import { FaSearch } from 'react-icons/fa';

export function Search(props) {


    return (
        <div className="Search">
            <FaSearch className="Search__icon" />
            <input type="text" placeholder="Išči" value={props.value}  />
        </div>
    );
}
