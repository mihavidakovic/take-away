import React from 'react'

export default function Add() {
    return (
        <div className="subpage Add">
            <div className="container">
                <h3>Dodaj restavracijo</h3>
                <div className="Form">
                    <div className="Form__control">
                        <label for="title">Ime restavracije: (<span>*</span>)</label>
                        <input className="input" type="text" placeholder="Pri Matičku" />
                    </div>
                    <div className="Form__control">
                        <label for="title">Opis: (<span>*</span>)</label>
                        <textarea className="input" placeholder="Burgerji, steaki, solate in sladice" rows="3" />
                    </div>
                    <div className="Form__control">
                        <label for="title">Telefon: (<span>*</span>)</label>
                        <input className="input" type="tel" placeholder="+38640999999" />
                    </div>
                    <div className="From__footer">
                        <div className="btn btn-primary">Dodaj</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
