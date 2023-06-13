import React, {useEffect} from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchOpenStreet } from "../../store/openstreets";

const EventShowPage = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const currentEventId = params.eventId
    const currentEvent = useSelector(state => state.openStreet[0])

    console.log(currentEvent)

    useEffect(() => {
        dispatch(fetchOpenStreet(currentEventId));
    }, [dispatch]);
    
    if (currentEvent) {
        return (
            <div className="event-show-page">
                <h1>Event Show Page</h1>
                <p>{currentEvent.dates}</p>
                <p>{currentEvent.location.mainStreet}</p>
            </div>
        )
    }
    
}

export default EventShowPage;