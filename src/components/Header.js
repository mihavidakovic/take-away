import React from 'react';
import {
    Link
} from "react-router-dom";
import logo from '../assets/img/logo.svg';

export default function Header() {
    return (
        <header className="header">
            <div className="container">
                <Link to="/">
                    <div className="logo">
                        <div className="logo__box">
                            <img src={logo} alt="logo" />
                        </div>
                        <div className="logo__text">
                            <h1 className="logo__name">Prevzemi.si</h1>
                            <h2 className="logo__subname">Najdi in naroči</h2>
                        </div>
                    </div>
                </Link>
                <div className="nav">
                    <Link to="/dodaj" className="nav__item">
                        <span className="btn btn-primary">
                            Dodaj<span className="nav__item--hidden"> restavracijo</span>
                        </span>
                    </Link>
                </div>
            </div>
        </header>
    );
}