import React from 'react'
import Loader from 'react-loader-spinner'

export default function NotAvailable() {
    return (
        <div className="subpage Manage">
            <Loader
                type="Rings"
                color="#7BA47F"
                height={60}
                width={60}
                timeout={3000} //3 secs
                className="Loading"
            />
        </div>
    )
}
