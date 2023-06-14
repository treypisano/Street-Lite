import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import React, {useEffect} from "react";
import { fetchOpenStreet } from "../../store/openstreets";
import { clearEvents } from "../../store/openstreets";
import './EventShow.css';

const EventCalendar = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const currentEventId = params.eventId
    const currentEvent = useSelector(state => state.openStreet[0])

    useEffect(() => {
        dispatch(fetchOpenStreet(currentEventId));
        // dispatch(clearEvents());
    }, [dispatch]);

    let days = currentEvent.dates;
    let daysarray = days.split(',');

    
    return (
        <div className="calendar">
            <ul className="days">
                <li id='mon'>Mon</li>
                <li id='tues'>Tues</li>
                <li id='wed'>Wed</li>
                <li id='thur'>Thur</li>
                <li id='fri'>Fri</li>
                <li id='sat'>Sat</li>
                <li id='sun'>Sun</li>
            </ul>
        </div>
    )
}

export default EventCalendar;