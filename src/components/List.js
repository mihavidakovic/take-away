import React, { useState, useEffect, useContext } from 'react';
import { Search } from './Search';
import ListItem from './ListItem';
import { SelectedRestaurantContext } from '../contexts/SelectedRestaurantContext';
import Loader from 'react-loader-spinner'
import { FaSearch } from 'react-icons/fa';

import Regions from "./Regions"
import { initial, rest } from 'lodash';
export default function List(props) {

    const [searchValue, setSearchValue] = useState("");
    const [data, setData] = useState();
    const [filteredData, setFilteredData] = useState();
    const [location, setLocation] = useState({
        lat: null,
        lon: null
    })
    const [selectedRegion, setSelectedRegion] = useState("all")

    const { changeSelectedRestaurant } = useContext(SelectedRestaurantContext)

    useEffect(() => {
        setData(props.data)
        setFilteredData(props.data)
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


    function handleChangeRegion(id) {
        const oldData = data;
        setFilteredData(oldData)
        setSelectedRegion(id)

        let newData = []

        if(id === "all") {
            console.log(id)
            setFilteredData(oldData)
        } else {
            newData = filteredData.filter(restaurant => {
                if(restaurant.region_id === id) {
                    return restaurant
                } else {
                    setFilteredData(oldData)
                }
            })

            setFilteredData(newData)
            console.log(filteredData)
        }
    }
    function handleValueChange(e) {
        setSearchValue(e.target.value)
        console.log(searchValue)
    }

    function handleSearch(e) {
        let oldList = data

        if(e !== "") {
            let newList = [];
            console.log(e.toLowerCase())
            newList = oldList.filter(restaurant => {
                return restaurant.title.toLowerCase().includes(e.toLowerCase()) || restaurant.description.toLowerCase().includes(e.toLowerCase());
            })
            console.log(oldList)
            console.log(newList)
            setFilteredData(newList)
        } else {
            setFilteredData(data)
        }

    }

    if (filteredData) {

        function handleSelectRestaurant(id, title, description, image, tel, lon, lat, delivery, takeaway, zoom, visible) {
            changeSelectedRestaurant(id, title, description, image, tel, lon, lat, delivery, takeaway, zoom, visible)
        }
            
        return (
            <div className="List">
                <div className="Search">
                    <FaSearch className="Search__icon" />
                    <input type="text" placeholder="Išči" onChange={(e) => 
                        handleSearch(e.target.value)
                    } />
                </div>
                <div className="List__container">
                    {filteredData.map((result, i) => (
                        <div
                            key={i}
                            className={"List__item " + result.region_id}
                            onClick={() =>
                                handleSelectRestaurant(
                                    result._id,
                                    result.title,
                                    result.description,
                                    result.image,
                                    result.tel,
                                    result.lon,
                                    result.lat,
                                    result.delivery,
                                    result.takeaway,
                                    17,
                                    1
                                )}>
                            <ListItem
                                data={searchValue.length > 0 ? filteredData : result}
                                location={location}
                            />
                        </div>
                    ))}
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
                    className="Loading"
                />
            </div>
        )
    }
}