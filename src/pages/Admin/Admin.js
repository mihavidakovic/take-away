import React from 'react'
import { FaPen, FaPlusCircle } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

import LoginButton from "../../components/login-button";
import LogoutButton from "../../components/logout-button";
import NotAvailable from "./NotAvailable.js";

function Admin() {
    const { isAuthenticated } = useAuth0();
    return (
        <div className="subpage Admin">
            <div className="container">
                <div className="Admin__head">
                    <h2>Administracija</h2>
                    {isAuthenticated ? <LogoutButton /> : <LoginButton />}
                </div>
                {isAuthenticated ? <AdminActions /> : <></>}
            </div>
        </div>
    )
}

const AdminActions = () => {
    return (
        <div class="Admin__actions">
            <Link to="/administracija/urejanje" className="action action__all">
                <FaPen />
                <span>Urejanje restavracij</span>
            </Link>
            <div className="action action__add">
                <FaPlusCircle />
                <span>Dodaj retavracijo</span>
            </div>
        </div>
    )
}
export default withAuthenticationRequired(Admin, {
    onRedirecting: () => <NotAvailable />,
  });
  