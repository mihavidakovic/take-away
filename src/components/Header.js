import React from 'react';
import logo from '../assets/img/logo.svg';

export default function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <img src={logo} />
                </div>
                <div className="nav">
                    <span>
                        Kategorije
                    </span>
                    <span>
                        Išči
                    </span>
                </div>
            </div>
        </header>
    );
}