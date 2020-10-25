import React, { useContext } from 'react';
import { SelectedRestaurantContext } from '../contexts/SelectedRestaurantContext';
import { FaArrowLeft, FaCheck, FaTimes, FaPhoneVolume } from 'react-icons/fa';

function SelectedRestaurant() {
    const { SelectedRestaurant, changeSelectedRestaurant } = useContext(SelectedRestaurantContext)

    if (SelectedRestaurant.visible === 1) {
        let data = SelectedRestaurant;
        function goBack() {
            changeSelectedRestaurant(
                null, 
                null, 
                null,
                null,
                null, 
                null, 
                null,
                false,
                false,
                null, 
                0
            )
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
                    <div className={data.delivery ? "available__takeaway available" : "available__takeaway"}>
                        {
                            data.delivery ? (
                                <FaCheck />
                            )
                            :
                            (
                                <FaTimes />
                            )
                        }
                        <span>Dostava</span>
                    </div>
                    <div className={data.takeaway ? "available__delivery available" : "available__delivery"}>
                        {
                            data.takeaway ? (
                                <FaCheck />
                            )
                            :
                            (
                                <FaTimes />
                            )
                        }
                        <span>Osebni prevzem</span>
                    </div>
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
