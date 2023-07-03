import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import React, {useEffect, useState} from "react";
import jwtFetch from '../../store/jwt';
import AttendItem from './AttendItem';
import { useLoggedIn } from "../../util/ApiUtil";
import './Attendees.css';
import logo from '../../images/1.png';

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

    console.log(attends)

    // on page render, make a fetch to check that if the current user is attending this event

    // Need backend custom validations, that way the user cant do this thing twice
    // Then, also could send a response on delete and create from the backend
    // ONLY act on this response if it is valid, if it is, then add that to the state

    const handleAttending = () => {
        setUserAttending(true)
        const attendPromise = jwtFetch('/api/attend/', { // when clicked, fetch attends
            method: 'POST',
            body: JSON.stringify({userId: userId, eventId: eventId.eventId})
        })
        setAttends([...attends, {userId: userId, eventId: eventId.eventId}]) 
        // This should take a response from the server
        // Change the attends state varaiable and add the user to it in the state
    }

    const handleNotAttending = () => {
        setUserAttending(false)
        const attendPromise = jwtFetch(`/api/attend/${userId}`, { // when clicked, fetch attends
            method: 'DELETE',
        })
        setAttends(attends.filter((attend) => attend.userId !== userId)) 
        // To fix bug of duplicates, need to send a response back from the server
        // This will tell the server that the stuff went thru in the backend
    }

    return (
        <>
        <div className='attending-button-container'>
            {
                useLoggedIn() && !userAttending && <button className='attending-button' onClick={handleAttending}>I'll be there!</button>
            }
            {
                useLoggedIn() && userAttending && <button className='attending-button' onClick={handleNotAttending}>Count me out</button>
            }
        </div>
        <div className='attending-list'>
            {attends?.map((atendee) => { 
                return (
                <div className='each-attendee'>
                    <img src={logo} id='attendee-lamp'></img>
                    <li id='attendee-name' key={atendee}><AttendItem attend={atendee} loadedUser={ currentUser }/></li>
                </div>
                )
            })}
        </div>
        </>
    )
}