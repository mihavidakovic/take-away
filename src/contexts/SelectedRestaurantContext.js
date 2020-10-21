import React, {useState, createContext} from 'react'

export const SelectedRestaurantContext = createContext();

const SelectedRestaurantProvider = (props) => {
    const [SelectedRestaurant, setSelectedRestaurant] = useState({visible: 2});

    const changeSelectedRestaurant = (id, title, description, image, tel, lon, lat, visible) => {
        setSelectedRestaurant({id: id, title: title, description: description, image: image, tel: tel, lon: lon, lat: lat, visible: visible})
    }

    return (
        <SelectedRestaurantContext.Provider value={{SelectedRestaurant, changeSelectedRestaurant}}>
            {props.children}
        </SelectedRestaurantContext.Provider>
    )
}

export default SelectedRestaurantProvider;