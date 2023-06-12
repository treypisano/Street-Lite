import React from "react";
import { NavLink } from 'react-router-dom';
import logogreen from "../../images/street_lite_logo_green.png";
import './navigation.css';

function NavigationBar () {
    return (
        <div className="navbar">
            <NavLink exact to="/"><img src={logogreen} className='logo' alt=''/></NavLink>
        </div>
    )
}

export default NavigationBar;