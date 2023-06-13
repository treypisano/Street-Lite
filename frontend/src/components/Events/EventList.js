import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import EventListItem from "./EventListItem";
import { getEvents, fetchOpenStreets } from "../../store/openstreets";
import './EventIndex.css'

function EventList() {
    // const events = useSelector(getEvents);
    const events = useSelector((state) => state.openStreet);
    const dispatch = useDispatch();
    // console.log(events);

    useEffect(() => {
        dispatch(fetchOpenStreets());
    }, [dispatch]);
    
    return (
            <div className="event-list">
                <h2 id="event-list-header">Event List</h2>
                { Object.values(events).slice(0,20).map((event) => (
                    <EventListItem key={event.id} event={event}/>
                ))}
            </div>
    )
}

export default EventList;