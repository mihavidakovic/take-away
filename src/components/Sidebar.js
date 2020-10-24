import React, {useContext} from 'react';
import { motion } from "framer-motion";
import List from "../components/List.js";
import SelectedRestaurantComponent from "../components/SelectedRestaurantComponent.js";

import { SelectedRestaurantContext } from '../contexts/SelectedRestaurantContext';

function Sidebar(props) {
    const {SelectedRestaurant} = useContext(SelectedRestaurantContext);
console.log(SelectedRestaurant.visible)
    return (
        <motion.div className={props.visible || SelectedRestaurant.visible === 1 ? "Sidebar visible" : "Sidebar"}>
            <SelectedRestaurantComponent />
            <List data={props.data} />
        </motion.div>
    )
}

export default Sidebar;