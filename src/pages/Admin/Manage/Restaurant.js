import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/sl'

export default function Restaurant(props) {

    const [restaurantStatus, setRestaurantStatus] = useState();

    useEffect(() => {
        setRestaurantStatus(props.data.visible)
    }, [props.data.visible])

    function publishRestaurant(id) {
        const url = "https://take-away-si.herokuapp.com/restaurants/" + id + "/publish";
        fetch(url, {
            method: "PATCH"
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setRestaurantStatus(1)
                    console.log(result)
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    function hideRestaurant(id) {
        const url = "https://take-away-si.herokuapp.com/restaurants/" + id + "/hide";
        fetch(url, {
            method: "PATCH"
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setRestaurantStatus(0)
                    console.log(result)
                },
                (error) => {
                    console.log(error)
                }
            )
    }
    dayjs.extend(relativeTime)
    dayjs.locale('sl')
    return (
        <div className="restaurant">
            <div
                className="restaurant__image"
                style={{ "backgroundImage": "url(" + props.data.image + ")" }}>
            </div>
            <div className="restaurant__info">
                <span className="info__title">{props.data.title}</span>
                <span className="info__description">{props.data.description}</span>
                <span className="info__createdAt" title={dayjs(props.data.created_at).format()}>{dayjs(props.data.created_at).fromNow()}</span>
            </div>
            <div className="restaurant__actions">
                {restaurantStatus === 1 ?
                    <div
                        className="btn btn-danger"
                        onClick={() => {
                            hideRestaurant(props.data._id)
                        }}
                    >Skrij</div>
                    :
                    <div
                        className="btn btn-primary"
                        onClick={() => {
                            publishRestaurant(props.data._id)
                        }}
                    >Objavi</div>
                }
                <div className="btn btn-primary">
                    Uredi
                </div>
            </div>
        </div>
    )
}
