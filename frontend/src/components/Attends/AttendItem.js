import React, { useEffect, useState } from "react";
import jwtFetch from '../../store/jwt';



export default function AttendItem({ attend }) {
    const [user, setUser] = useState();

    const fetchUserById = async (attend) => { // Make this into fell ALL users, then use the promise it returns and push that to state ONCE
        const res = await jwtFetch(`/api/users/author/${attend.userId}`);
        if (res.ok) {
            const user = await res.json();
            return user;
        }
    };

    useEffect(() => {
        fetchUserById(attend)
            .then((user) => setUser(user))
    }, [])

    

    if (!user) {
        return (<></>)
    }
    return (
        
        <div>{user.username}</div>
    )
}