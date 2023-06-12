import { logout } from "../../store/session"
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function LogoutButton () {
    const dispatch = useDispatch()
    
    function handleLogout(e) {
       dispatch(logout()) 
    }

    return (
        <div onClick={handleLogout}>
            Logout
        </div>
    )
}