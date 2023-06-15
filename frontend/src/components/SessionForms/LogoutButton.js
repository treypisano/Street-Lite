import { logout } from "../../store/session"
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../Navigation/navigation.css';

export default function LogoutButton () {
    const dispatch = useDispatch()
    
    function handleLogout(e) {
       dispatch(logout()) 
    }

    return (
        <div className='logout' onClick={handleLogout}>
            Logout
        </div>
    )
}