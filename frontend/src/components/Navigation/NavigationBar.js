import React from "react";
import { NavLink } from 'react-router-dom';
import logogreen from "../../images/street_lite_logo_green.png";
import './navigation.css';
import ProfileButton from "./ProfileButton";

function NavigationBar () {
    return (
        <div className="navbar">
            <div>
                <NavLink exact to="/"><img src={logogreen} className='logo' alt=''/></NavLink>
            </div>
            <div className="profile-button">
                <ProfileButton />
            </div>
        </div>
    )
}

export default NavigationBar;