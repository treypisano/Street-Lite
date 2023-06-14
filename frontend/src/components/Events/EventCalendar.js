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
                <div className={daysarray.includes('mon') ? 'show-day' : null} >
                    <li id='mon'>Mon</li>
                </div>
                <div className={daysarray.includes('tue') ? 'show-day' : null} >
                    <li id='tues'>Tues</li>
                </div>
                <div className={daysarray.includes('wed') ? 'show-day' : null} >
                    <li id='wed'>Wed</li>
                </div>
                <div className={daysarray.includes('thu') ? 'show-day' : null} >
                    <li id='thu'>Thur</li>
                </div>
                <div className={daysarray.includes('fri') ? 'show-day' : null} >
                    <li id='fri'>Fri</li>
                </div>
                <div className={daysarray.includes('sat') ? 'show-day' : null} >
                    <li id='sat'>Sat</li>
                </div>
                <div className={daysarray.includes('sun') ? 'show-day' : null} >
                    <li id='sun'>Sun</li>
                </div>
            </ul>
        </div>
    )
}

export default EventCalendar;