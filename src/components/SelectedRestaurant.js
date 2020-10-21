import React, { useState, useEffect, useContext } from 'react';
import { SelectedRestaurantContext } from '../contexts/SelectedRestaurantContext';
import { FaArrowLeft } from 'react-icons/fa';
import { motion } from "framer-motion"

const list = {
    hidden: { 
        opacity: 0,
        y: 10,
        transition: {
            duration: 0.2
        }
    }, 
    visible: { 
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.2
        }
    }
}

function SelectedRestaurant() {
    const { SelectedRestaurant, changeSelectedRestaurant } = useContext(SelectedRestaurantContext)

    if (SelectedRestaurant.visible === 1) {
        let data = SelectedRestaurant;
        function goBack() {
            changeSelectedRestaurant({ visible: 0 })
        }

        return (
            <motion.div className="SelectedRestaurant" initial="hidden" animate="visible" variants={list}>
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
            </motion.div>
        )

    } else {
        return (
            <>
            </>
        )
    }
}

export default SelectedRestaurant
