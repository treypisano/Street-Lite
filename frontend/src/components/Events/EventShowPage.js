import React, {useEffect} from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchOpenStreet } from "../../store/openstreets";
import { clearEvents } from "../../store/openstreets";
import './EventShow.css';

const EventShowPage = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const currentEventId = params.eventId
    const currentEvent = useSelector(state => state.openStreet[0])

    useEffect(() => {
        dispatch(fetchOpenStreet(currentEventId));
        dispatch(clearEvents());
    }, [dispatch]);
    
    if (currentEvent) {
        return (
            <div className="event-show-page">
                <h1>Event Show Page</h1>
                <div className="event-body">
                    <div className="event-info">
                        <p>Dates: {currentEvent.dates}</p>
                        <p>Main Street: {currentEvent.location.mainStreet}</p>
                    </div>
                    <div className="event-users">
                        <div className="attendees">
                            Attendees
                        </div>
                        <div className="comments">
                            Comments
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default EventShowPage;