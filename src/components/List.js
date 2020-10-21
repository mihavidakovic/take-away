import React, {useState, useEffect, useContext} from 'react';
import { Search } from './Search';
import ListItem from './ListItem';
import {SelectedRestaurantContext} from '../contexts/SelectedRestaurantContext';

export default function List(props) {

    const [searchValue, setSearchValue] = useState("");
    const [data, setData] = useState([]);

    const {SelectedRestaurant, changeSelectedRestaurant} = useContext(SelectedRestaurantContext)

    useEffect(() => {
        setData(props.data)
    }, [props.data])

    
    function handleSearch(e) {
        setSearchValue(e)
    }    

    if (data) {

        function handleSelectRestaurant(id, title, description, image, tel, lon, lat, visible) {
            changeSelectedRestaurant(id, title, description, image, tel, lon, lat, visible)
        }

        let items = data
            .filter(data => {
                if(searchValue === null) {
                    return data;
                } else if(data.title.toLowerCase().includes(searchValue.toLowerCase()) || data.description.toLowerCase().includes(searchValue.toLowerCase())) {
                    return data;
                }

                return null
            })
            .map((data, i) => {
                    return(
                        <div className="List__item" onClick={() => handleSelectRestaurant(data._id, data.title, data.description, data.image, data.tel, data.lon, data.lat, 1)}>
                            <ListItem 
                                key={i} 
                                title={data.title} 
                                description={data.description} 
                                image={data.image}
                            />
                        </div>
                    )
                }
            );
    
        return (
            <div className="List">
                <Search value={searchValue} onChange={handleSearch} />
                <div className="List__container">
                    {items}
                </div>
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