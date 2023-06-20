import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import React, {useEffect, useState} from "react";
import jwtFetch from '../../store/jwt';

async function fetchAttends(eventId) {
    const response = await fetch(`/api/attend/${eventId}`, {method: 'GET'})
    const attends = await response.json()

    return attends
}

const fetchUserById = async (attend) => {
    const res = await jwtFetch(`/api/users/author/${attend.userId}`);
    if (res.ok) {
      const author = await res.json();
      return author;
    }
  };

export default function AttendList() {
    const [attends, setAttends] = useState();
    const [attendees, setAttendees] = useState([])
    const eventId = useParams();
    const userId = useSelector((state) => state.session?.user?._id);
    useEffect(() => {
        fetchAttends(eventId.eventId)
            .then((attends) => {
                attends.forEach((attend) => {
                    fetchUserById(attend).then((attend) => {
                        console.log(attend.username)
                        setAttendees(attendees.concat(attend.username)) 
                    })
                // console.log(attend.userId)
                })
                // setAttends(attends)
            })
        // console.log(attendees)
    }, [])



    const handleAttending = () => {
        jwtFetch('/api/attend/', {
            method: 'POST',
            body: JSON.stringify({userId: userId, eventId: eventId.eventId})
        })
    }

    return (
        <>
        <div>
            <button onClick={handleAttending}>I am attending</button>
            {/* {attends && Object.values(attend).map((ele) => )} */}
        </div>
        <div>
            {attendees.map((atendee) => <div>{atendee}</div>)}
        </div>
        </>
    )
}