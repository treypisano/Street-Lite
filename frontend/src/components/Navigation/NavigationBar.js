import React from "react";
import logogreen from "../../images/street_lite_logo_green.png";
import './navigation.css';

function NavigationBar () {
    return (
        <div>
            <div className="logo">
                <img src={logogreen} className="logo"></img>              
            </div>
            <p>Navigation Bar</p>
        </div>
    )
}

export default NavigationBar;