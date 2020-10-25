import React, { useState, useEffect } from 'react'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import { FaArrowLeft, FaCheck, FaTimes, FaPhoneVolume } from 'react-icons/fa';
import Loader from 'react-loader-spinner'

import Message from "../components/Message";

function Add(props) {
    const [result, setResult] = useState({ address: "" });
    const [message, setMessage] = useState();
    const [messageStatus, setMessageStatus] = useState(0);
    const [regions, setRegions] = useState();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tel, setTel] = useState("");
    const [image, setImage] = useState("");
    const [lon, setLon] = useState();
    const [lat, setLat] = useState();
    const [takeaway, setTakeaway] = useState(false);
    const [delivery, setDelivery] = useState(false);
    const [region, setRegion] = useState();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        let url = "https://take-away-si.herokuapp.com/restaurants/";

        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "title": title,
                "description": description,
                "tel": tel,
                "image": image,
                "lon": lat,
                "lat": lon,
                "takeaway": takeaway,
                "delivery": delivery,
                "region_id": region
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setMessageStatus(1)
                    setMessage("Restavracija je bila uspešno dodana! Ko bo potrjena iz naše strani, bo vidna na zemljevidu.")
                },
                (error) => {
                    console.log(error)
                    setMessageStatus(1)
                    setMessage(error.message.message)
                }
            )
    }

    const handleChange = address => {
        setResult({ address });
    };

    const handleSelect = address => {
        console.log(address)
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                setResult({ address });
                setLat(latLng.lat)
                setLon(latLng.lng)
            })
            .catch(error => console.error('Error', error));
    };
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
        getRegions()
    }, [])

    if (regions) {
        return (
            <div className="subpage Add">
                <div className="container">
                    <div className="Add__grid">
                        <div>
                            <h3>Dodaj restavracijo</h3>
                            <form onSubmit={handleSubmit} className="Form Add__form">
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
                                    <label htmlFor="title">Lokacija: (<span>*</span>)</label>
                                    <PlacesAutocomplete
                                        onChange={handleChange}
                                        onSelect={handleSelect}
                                        value={result.address}
                                    >
                                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                            <div className="Form__search">
                                                <input
                                                    {...getInputProps({
                                                        placeholder: 'Poišči lokacijo',
                                                        className: 'input',
                                                    })}
                                                />
                                                <div className="autocomplete-dropdown-container">
                                                    {loading && <div className="loading">Iščem...</div>}
                                                    {suggestions.map((suggestion, i) => {
                                                        const className = 'suggestion-item';
                                                        // inline style for demonstration purpose
                                                        return (
                                                            <div
                                                                key={i}
                                                                {...getSuggestionItemProps(suggestion, {
                                                                    className
                                                                })}
                                                            >
                                                                <span>{suggestion.description}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </PlacesAutocomplete>
                                </div>
                                <div className="Form__control">
                                    <label htmlFor="title">Regija: (<span>*</span>)</label>
                                    <select className="input" onChange={e => setRegion(e.target.value)} value={region}>
                                        {regions.map((region, i) => {
                                            return (
                                                <option key={i} value={region._id}>{region.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="Form__control">
                                    <label htmlFor="title">Dostava: (<span>*</span>)</label>
                                    <input className="input" type="checkbox" onChange={e => setDelivery(!delivery)} checked={delivery ? "checked" : ""} />
                                </div>
                                <div className="Form__control">
                                    <label htmlFor="title">Osebni prevzem: (<span>*</span>)</label>
                                    <input className="input" type="checkbox" onChange={e => setTakeaway(!takeaway)} checked={takeaway ? "checked" : ""} />
                                </div>
                                <div className="Form__footer">
                                    <button type="submit" className="btn btn-primary">Dodaj</button>
                                    <Message visible={messageStatus} message={message} type={1} />
                                </div>
                            </form>

                        </div>
                        <div className="Add__preview">
                            <h3>Predogled</h3>
                            <div className="Preview">
                                <div className="SelectedRestaurant Preview__restaurant">
                                    <div className={image.length === 0 ? "SelectedRestaurant__image placeholder" : "SelectedRestaurant__image"} style={{
                                        'backgroundImage': 'url(' + image + ')'
                                    }}>
                                    </div>
                                    <div className="SelectedRestaurant__info">
                                        <div className="info__left">
                                            <span className="SelectedRestaurant__info--title">{title.length === 0 ? <span className="placeholder placeholder__title"></span> : title}</span>
                                            <span className="SelectedRestaurant__info--description">{description.length === 0 ? <span className="placeholder placeholder__description"></span> : description}</span>

                                        </div>
                                        <a href="tel:0404040" className="info__right">
                                            <FaPhoneVolume />
                                            <span className="SelectedRestaurant__info--tel">{tel.length === 0 ? <span className="placeholder placeholder__tel"></span> : tel}</span>
                                        </a>
                                    </div>
                                    <div className="SelectedRestaurant__available">
                                        <div className={delivery ? "available__takeaway available" : "available__takeaway"}>
                                            {
                                                delivery ? (
                                                    <FaCheck />
                                                )
                                                    :
                                                    (
                                                        <FaTimes />
                                                    )
                                            }
                                            <span>Dostava</span>
                                        </div>
                                        <div className={takeaway ? "available__delivery available" : "available__delivery"}>
                                            {
                                                takeaway ? (
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="subpage Add">
            <div className="container">
                <div className="Add__grid">
                    <div>
                        <h3>Dodaj restavracijo</h3>
                        <form onSubmit={handleSubmit} className="Form Add__form">
                            <Loader
                                type="Rings"
                                color="#7BA47F"
                                height={60}
                                width={60}
                                className="Loading"
                            />
                        </form>
                    </div>
                    <div className="Add__preview">
                        <h3>Predogled</h3>
                        <div className="Preview">
                            <div className="SelectedRestaurant Preview__restaurant">
                                <div className={image.length === 0 ? "SelectedRestaurant__image placeholder" : "SelectedRestaurant__image"} style={{
                                    'backgroundImage': 'url(' + image + ')'
                                }}>
                                </div>
                                <div className="SelectedRestaurant__info">
                                    <div className="info__left">
                                        <span className="SelectedRestaurant__info--title">{title.length === 0 ? <span className="placeholder placeholder__title"></span> : title}</span>
                                        <span className="SelectedRestaurant__info--description">{description.length === 0 ? <span className="placeholder placeholder__description"></span> : description}</span>

                                    </div>
                                    <a href="tel:0404040" className="info__right">
                                        <FaPhoneVolume />
                                        <span className="SelectedRestaurant__info--tel">{tel.length === 0 ? <span className="placeholder placeholder__tel"></span> : tel}</span>
                                    </a>
                                </div>
                                <div className="SelectedRestaurant__available">
                                    <div className={delivery ? "available__takeaway available" : "available__takeaway"}>
                                        {
                                            delivery ? (
                                                <FaCheck />
                                            )
                                                :
                                                (
                                                    <FaTimes />
                                                )
                                        }
                                        <span>Dostava</span>
                                    </div>
                                    <div className={takeaway ? "available__delivery available" : "available__delivery"}>
                                        {
                                            takeaway ? (
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )

    }
}


export default React.memo(Add)
