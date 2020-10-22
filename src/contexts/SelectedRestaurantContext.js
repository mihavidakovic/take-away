import React, {useState, createContext} from 'react'

export const SelectedRestaurantContext = createContext();

const SelectedRestaurantProvider = (props) => {
    const [SelectedRestaurant, setSelectedRestaurant] = useState({lon: 46.246993, lat: 14.3651411, zoom: 8, visible: 0});

    const changeSelectedRestaurant = (id, title, description, image, tel, lon, lat, zoom, visible) => {
        setSelectedRestaurant({id: id, title: title, description: description, image: image, tel: tel, lon: lon, lat: lat, zoom: zoom, visible: visible})
    }

    return (
        <SelectedRestaurantContext.Provider value={{SelectedRestaurant, changeSelectedRestaurant}}>
            {props.children}
        </SelectedRestaurantContext.Provider>
    )
}

export default SelectedRestaurantProvider;