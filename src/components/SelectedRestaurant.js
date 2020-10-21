import React, { useState, useEffect, useContext } from 'react';
import { SelectedRestaurantContext } from '../contexts/SelectedRestaurantContext';
import { FaArrowLeft, FaCheck, FaTimes, FaPhoneVolume } from 'react-icons/fa';
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
                    <div className="info__left">
                        <span className="SelectedRestaurant__info--title">{data.title}</span>
                        <span className="SelectedRestaurant__info--description">{data.description}</span>

                    </div>
                    <a href="tel:0404040" className="info__right">
                        <FaPhoneVolume />
                        <span className="SelectedRestaurant__info--tel">{data.tel}</span>
                    </a>
                </div>
                <div className="SelectedRestaurant__available">
                <div className="available__delivery unavailable">
                        <FaTimes />
                        <span>Dostava</span>
                    </div>
                    <div className="available__takeaway available">
                        <FaCheck />
                        <span>Osebni prevzem</span>
                    </div>
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
