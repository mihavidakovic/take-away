import React from 'react';
import logo from '../assets/img/logo.svg';

export default function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <div className="logo__box">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="logo__text">
                        <span className="logo__name">Take-away.si</span>
                        <span className="logo__subname">Najdi in naroči</span>
                    </div>
                </div>
                <div className="nav">
                    <span class="btn btn-primary">
                        Dodaj restavracijo
                    </span>
                </div>
            </div>
        </header>
    );
}