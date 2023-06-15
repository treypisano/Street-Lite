import React, {useState} from "react";
import { NavLink } from 'react-router-dom';
import logogreen from "../../images/street_lite_logo_green.png";
import logoyellow from "../../images/street_lite_logo_yellow.png"
import './navigation.css';
import ProfileButton from "./ProfileButton";

function NavigationBar () {
    const [hover, isHover] = useState(false);

    const handleLogoHover = () => {
        isHover(!hover);
    }
    
    return (
        <div className="navbar">
            <div>
                <NavLink exact to="/"><img src={hover ? logoyellow : logogreen} className="logo" alt='' onMouseEnter={handleLogoHover} onMouseLeave={handleLogoHover}/></NavLink>
                {/* <NavLink exact to="/"><img src={logogreen} id={hover ? 'hidden' : ''} className="logo" alt='' onMouseEnter={handleLogoHover} onMouseLeave={handleLogoHover}/></NavLink>
                <NavLink exact to="/"><img src={logoyellow} id={hover ? '' : 'hidden'} className="logo" alt='' onMouseEnter={handleLogoHover} onMouseLeave={handleLogoHover}/></NavLink> */}
            </div>
            <div className="profile-button">
                <ProfileButton />
            </div>
        </div>
    )
}

export default NavigationBar;