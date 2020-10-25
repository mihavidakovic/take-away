import { map } from 'lodash';
import React, { useState, useEffect } from 'react'

export default function Regions({selected, onChangeRegion}) {
    const [regions, setRegions] = useState();

    useEffect(() => {
        fetch("https://take-away-si.herokuapp.com/regions")
            .then(res => res.json())
            .then(
                (result) => {
                    setRegions(result)
                },
                (error) => {
                    console.log(error)
                }
            )

    }, [])

    if (regions) {
        return (
            <div className="Regions">
                <div className={selected === "all" ? "Region selected" : "Region"} onClick={() => onChangeRegion("all")}>
                    <span>Vse regije</span>
                </div>
                {regions.map((region, i) => {
                    return (
                        <div key={i} className={selected === region._id ? "Region selected" : "Region"} onClick={() => onChangeRegion(region._id)}>
                            <span>{region.name}</span>
                        </div>
                    )
                })}
            </div>
        )
    } else {
        return (
            <div className="Regions">
                <div className="Region selected">
                    <span>Vse regije</span>
                </div>
            </div>
        )
    }
}
