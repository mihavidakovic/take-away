import React, { useState, useEffect, useContext } from 'react';
import { Search } from './Search';
import ListItem from './ListItem';
import { SelectedRestaurantContext } from '../contexts/SelectedRestaurantContext';
import { usePosition } from 'use-position';
import Loader from 'react-loader-spinner'

export default function List(props) {

    const [searchValue, setSearchValue] = useState("");
    const [data, setData] = useState([]);
    const [location, setLocation] = useState({
        lat: null,
        lon: null
    })

    const { SelectedRestaurant, changeSelectedRestaurant } = useContext(SelectedRestaurantContext)

    useEffect(() => {
        setData(props.data)
        getLocation()
    }, [props.data])

    function getLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
            });
        } else {
            console.log("no position available")
        }
    }

    function handleSearch(e) {
        setSearchValue(e)
    }

    if (data) {

        function handleSelectRestaurant(id, title, description, image, tel, lon, lat, zoom, visible) {
            changeSelectedRestaurant(id, title, description, image, tel, lon, lat, zoom, visible)
        }

        let items = data
            .filter(data => {
                if (searchValue === null) {
                    return data;
                } else if (data.title.toLowerCase().includes(searchValue.toLowerCase()) || data.description.toLowerCase().includes(searchValue.toLowerCase())) {
                    return data;
                }

                return null
            })
            .map((data, i) => {
                return (
                    <div className="List__item" 
                    onClick={() => 
                        handleSelectRestaurant(
                            data._id, 
                            data.title, 
                            data.description, 
                            data.image, 
                            data.tel, 
                            data.lon, 
                            data.lat, 
                            15, 
                            1
                        )}>
                        <ListItem
                            key={i}
                            title={data.title}
                            description={data.description}
                            image={data.image}
                            lat={data.lat}
                            lon={data.lon}
                            location={location}
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
        return (
            <div className="List">
                <Loader
                    type="Rings"
                    color="#7BA47F"
                    height={60}
                    width={60}
                    timeout={3000} //3 secs
                    className="Loading"
                />
            </div>
        )
    }
}