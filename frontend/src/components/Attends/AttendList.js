import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import React, {useEffect, useState} from "react";

async function fetchAttends(eventId) {
    const response = await fetch(`/api/attend/${eventId}`, {method: 'GET'})
    const attends = await response.json()

    return attends
}

export default function AttendList() {
    const [attends, setAttends] = useState()
    
    useEffect(() => {
        fetchAttends()
            .then((attends) => {
                console.log(attends)
                // setAttends(attends)
            })
    }, [])

    return (
        <div>
            {/* {attends && Object.values(attend).map((ele) => )} */}
        </div>
    )
}