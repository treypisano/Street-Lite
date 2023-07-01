import React, { useEffect, useState } from "react";
import jwtFetch from '../../store/jwt';



export default function AttendItem({ attend, loadedUser }) {
    const [user, setUser] = useState();

    const fetchUserById = async (attend) => { // Make this into fell ALL users, then use the promise it returns and push that to state ONCE
        const res = await jwtFetch(`/api/users/author/${attend.userId}`);
        if (res.ok) {
            const user = await res.json();
            return user;
        }
    };
    
    useEffect(() => {
        // if (loadedUser?._id !== attend.userId) {
        fetchUserById(attend)
            .then((user) => setUser(user))
        // } else {
        //     setUser(loadedUser)
        // }
    }, [])

    if (!user) {
        return (<></>)
    }
    return (
        <div>{user.username}</div>
    )
}