import React, { useState, useEffect } from 'react'
import {
    useParams
} from "react-router-dom";
import Loader from 'react-loader-spinner'

export default function Edit() {
    let { id } = useParams();
    const [data, setData] = useState()
    const [regions, setRegions] = useState();

    //inputs
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [tel, setTel] = useState();
    const [image, setImage] = useState();
    const [lon, setLon] = useState();
    const [lat, setLat] = useState();
    const [takeaway, setTakeaway] = useState();
    const [delivery, setDelivery] = useState();
    const [region, setRegion] = useState();

    const handleSubmit = (evt) => {
        evt.preventDefault();

        let url = "https://take-away-si.herokuapp.com/restaurants/" + id;
        fetch(url, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                "title": title,
                "description": description,
                "tel": tel,
                "image": image,
                "lon": lon,
                "lat": lat,
                "takeaway": takeaway,
                "delivery": delivery, 
                "region_id": region    
            })
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

    function getData(id) {
        let url = "https://take-away-si.herokuapp.com/restaurants/" + id;
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    setData(result)
                    setTitle(result.title)
                    setDescription(result.description)
                    setTel(result.tel)
                    setImage(result.image)
                    setLon(result.lon)
                    setLat(result.lat)
                    setTakeaway(result.takeaway)
                    setDelivery(result.delivery)
                    setRegion(result.region_id)
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    function getRegions() {
        let url = "https://take-away-si.herokuapp.com/regions";
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    setRegions(result)
                    console.log(result)
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    useEffect(() => {
        
        getData(id)
        getRegions()

    }, [id])


    console.log(region)
    if (data && id && regions) {
        return (
            <div className="subpage Edit">
                <div className="container">
                    <h2>Uredi restavracijo "{data.title}"</h2>
                    <form onSubmit={handleSubmit} className="Form">
                        <div className="Form__control">
                            <label htmlFor="title">Ime restavracije: (<span>*</span>)</label>
                            <input className="input" type="text" placeholder="Pri Matičku" value={title} onChange={e => setTitle(e.target.value)} />
                        </div>
                        <div className="Form__control">
                            <label htmlFor="title">Opis: (<span>*</span>)</label>
                            <textarea className="input" placeholder="Burgerji, steaki, solate in sladice" rows="3" value={description} onChange={e => setDescription(e.target.value)} />
                        </div>
                        <div className="Form__control">
                            <label htmlFor="title">Slika: (<span>*</span>)</label>
                            <input className="input" type="text" placeholder="https://" value={image} onChange={e => setImage(e.target.value)} />
                        </div>
                        <div className="Form__control">
                            <label htmlFor="title">Telefon: (<span>*</span>)</label>
                            <input className="input" type="tel" placeholder="+38640999999" value={tel} onChange={e => setTel(e.target.value)} />
                        </div>
                        <div className="Form__control">
                            <label htmlFor="title">Lat: (<span>*</span>)</label>
                            <input className="input" type="text" placeholder="14.44131123" value={lat} onChange={e => setLat(e.target.value)} />
                        </div>
                        <div className="Form__control">
                            <label htmlFor="title">Lon: (<span>*</span>)</label>
                            <input className="input" type="text" placeholder="2.12461354" value={lon} onChange={e => setLon(e.target.value)} />
                        </div>
                        <div className="Form__control">
                            <label htmlFor="title">Regija: (<span>*</span>)</label>
                            <select className="input" onChange={e => setRegion(e.target.value)} value={region}>
                                {regions.map((region, i) => {
                                    return(
                                        <option key={i} value={region._id} selected={region._id == region}>{region.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="Form__control">
                            <label htmlFor="title">Dostava: (<span>*</span>)</label>
                            <input className="input" type="checkbox"  onChange={e => setDelivery(!delivery)} checked={delivery ? "checked" : ""} />
                        </div>
                        <div className="Form__control">
                            <label htmlFor="title">Osebni prevzem: (<span>*</span>)</label>
                            <input className="input" type="checkbox"  onChange={e => setTakeaway(!takeaway)}  checked={takeaway ? "checked" : ""} />
                        </div>
                        <div className="From__footer">
                            <button type="submit" className="btn btn-primary">Potrdi</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    } else {
        return <Loader
            type="Rings"
            color="#7BA47F"
            height={60}
            width={60}
            timeout={3000} //3 secs
            className="Loading"
        />
    }
}
