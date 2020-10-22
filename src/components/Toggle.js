import React, {useContext} from "react";
import { SelectedRestaurantContext } from '../contexts/SelectedRestaurantContext';

export default function Toggle(props) {
    const {SelectedRestaurant, changeSelectedRestaurant} = useContext(SelectedRestaurantContext)

    console.log(props)
    return (
        <div className="Toggle" onClick={() => 
            changeSelectedRestaurant()}>
            <span>{1 ? "Pokaži zemljevid" : "Prikaži vse restavracije"}</span>
        </div>
);
}
