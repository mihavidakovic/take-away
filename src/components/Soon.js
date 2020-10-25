import React from 'react'
import logo from '../assets/img/logo.svg';

export default function Soon() {
    return (
        <div className="Soon">
            <div className="logo">
                <div className="logo__box">
                    <img src={logo} alt="logo" />
                </div>
                <div className="logo__text">
                    <span className="logo__name">Prevzemi.si</span>
                    <span className="logo__subname">Najdi in naroči</span>
                </div>
            </div>
            <div className="Soon__text">
                <span>Kmalu</span>
            </div>
        </div>
    )
}
