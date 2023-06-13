import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import './footer.css';

function Footer() {
    return (
        <div className="footer">
            <Link to={'/'}>
                Homepage
            </Link>
            <br></br>
            <Link to={'/events'}>
                Events
            </Link>
        </div>
    )
}

export default Footer;