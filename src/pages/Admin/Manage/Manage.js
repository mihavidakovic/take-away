import React, { useState, useEffect } from 'react'
import { withAuthenticationRequired } from "@auth0/auth0-react";

import Restaurant from "./Restaurant";
import NotAvailable from "../NotAvailable.js";

function Manage() {

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

    if (restaurants) {
        return (
            <div className="subpage Manage">
                <div className="container">
                    <h2>Vse restavracije</h2>
                    <div className="Manage__restaurants">
                        {restaurants.map((restaurant, i) => {
                            return <Restaurant key={i} data={restaurant} />
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
export default withAuthenticationRequired(Manage, {
    onRedirecting: () => <NotAvailable />,
  });
  