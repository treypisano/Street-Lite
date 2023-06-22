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
    const [userAttending, setUserAttending] = useState(true);
    const eventId = useParams();
    const userId = useSelector((state) => state.session?.user?._id);
    const currentUser = useSelector((state) => state.session?.user);

    console.log(attends)
    function checkUserAttending(attends) {
        for (let i = 0; i < attends.length; i++) {
            const attend = attends[i]
            if (attend.userId === userId)
            {
                return true
            }
        }
        return false
    }

    useEffect(() => {
        fetchAttends(eventId.eventId)
            .then((attends) => {
                setAttends(attends)
                setUserAttending(checkUserAttending(attends))
            })
    }, [])

    // on page render, make a fetch to check that if the current user is attending this event

    const handleAttending = () => {
        setUserAttending(true)
        const attendPromise = jwtFetch('/api/attend/', { // when clicked, fetch attends
            method: 'POST',
            body: JSON.stringify({userId: userId, eventId: eventId.eventId})
        })
        setAttends([...attends, {userId: userId, eventId: eventId.eventId}]) 
        // Change the attends state varaiable and add the user to it in the state
    }

    const handleNotAttending = () => {
        setUserAttending(false)
        const attendPromise = jwtFetch(`/api/attend/${userId}`, { // when clicked, fetch attends
            method: 'DELETE',
        })
        setAttends(attends.filter((attend) => attend.userId !== userId)) 
    }

    return (
        <>
        <div>
            {
                useLoggedIn() && !userAttending && <button onClick={handleAttending}>I am attending</button>
            }
            {
                useLoggedIn() && userAttending && <button onClick={handleNotAttending}>I'm not attending...</button>
            }
        </div>
        <div>
            {attends?.map((atendee) => { 
                return (<li key={atendee}><AttendItem attend={atendee} loadedUser={ currentUser }/></li>)
            })}
        </div>
        </>
    )
}