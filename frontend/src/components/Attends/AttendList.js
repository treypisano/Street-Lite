import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import React, {useEffect, useState} from "react";
import jwtFetch from '../../store/jwt';
import AttendItem from './AttendItem';
import { useLoggedIn } from "../../util/ApiUtil";

async function fetchAttends(eventId) {
    const response = await fetch(`/api/attend/${eventId}`, {method: 'GET'})
    const attends = await response.json()

    return attends
}

export default function AttendList() {
    const [attends, setAttends] = useState();
    const eventId = useParams();
    const userId = useSelector((state) => state.session?.user?._id);
    useEffect(() => {
        fetchAttends(eventId.eventId)
            .then((attends) => {
                setAttends(attends)
            })
    }, [])



    const handleAttending = () => {
        jwtFetch('/api/attend/', {
            method: 'POST',
            body: JSON.stringify({userId: userId, eventId: eventId.eventId})
        })
    }
    console.log(attends)
    // debugger
    return (
        <>
        <div>
            {
                useLoggedIn() && <button onClick={handleAttending}>I am attending</button>
            }
            {/* {attends && Object.values(attend).map((ele) => )} */}
        </div>
        <div>
            {attends?.map((atendee) => { 
                return (<li key={atendee}><AttendItem attend={atendee}/></li>)
            })}
        </div>
        </>
    )
}