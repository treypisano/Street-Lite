import React, {useEffect} from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchOpenStreet } from "../../store/openstreets";

const EventShowPage = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const currentEventId = params.eventId
    const currentEvent = useSelector(state => state.openStreet)

    useEffect(() => {
        dispatch(fetchOpenStreet(currentEventId));
    }, [dispatch]);
    
    return (
        <div className="event-show-page">
            <h1>Event Show Page</h1>
        </div>
    )
}

export default EventShowPage;