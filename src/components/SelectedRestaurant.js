import React, {useState, useEffect, useContext} from 'react';
import {SelectedRestaurantContext} from '../contexts/SelectedRestaurantContext';
import { FaArrowLeft } from 'react-icons/fa';

function SelectedRestaurant() {
    const {SelectedRestaurant, changeSelectedRestaurant} = useContext(SelectedRestaurantContext)

    if(SelectedRestaurant.visible === 1) {
        let data = SelectedRestaurant;
        function goBack() {
            changeSelectedRestaurant({visible: 0})
        }
    
        return (
            <div className="SelectedRestaurant">
                <div className="SelectedRestaurant__image" style={{
                'backgroundImage': 'url(' + data.image + ')'
                }}>
                    <div className="SelectedRestaurant__back" onClick={() => goBack()}>
                        <FaArrowLeft />
                        <span>Nazaj</span>
                    </div>
                </div>
                <div className="SelectedRestaurant__info">
                    <span className="SelectedRestaurant__info--title">{data.title}</span>
                    <span className="SelectedRestaurant__info--description">{data.description}</span>
                    <span className="SelectedRestaurant__info--description">{data.lon}</span>
                    <span className="SelectedRestaurant__info--description">{data.lat}</span>
                </div>
            </div>
        )
    
    } else {
        return (
            <>
            </>
        )
    }
}

export default SelectedRestaurant
