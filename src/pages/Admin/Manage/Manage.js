import React, { useState, useEffect } from 'react'

import Restaurant from "./Restaurant";

export default function Manage() {

    const [restaurants, setRestaurants] = useState();

    useEffect(() => {
        fetch("https://take-away-si.herokuapp.com/restaurants/all")
            .then(res => res.json())
            .then(
                (result) => {
                    setRestaurants(result)
                },
                (error) => {
                    console.log(error)
                }
            )
    }, [])

    function publishRestaurant(id) {
        const url = "https://take-away-si.herokuapp.com/restaurants/" + id + "/publish";
        fetch(url, {
            method: "PATCH"
        })
            .then(res => res.json())
            .then(
                (result) => {
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
                    console.log(result)
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    if (restaurants) {
        return (
            <div className="subpage Manage">
                <div className="container">
                    <h2>Vse restavracije</h2>
                    <div className="Manage__restaurants">
                        {restaurants.map((restaurant) => {
                            return <Restaurant data={restaurant} />
                        })}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <span>loading</span>
        )
    }
}
