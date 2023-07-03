import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventListItem from "./EventListItem";
import { getEvents, fetchOpenStreets } from "../../store/openstreets";
import './EventIndex.css';

function EventList() {
  const events = useSelector((state) => state.openStreet);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOpenStreets());
  }, [dispatch]);

  return (
    <div className="event-list">
      <div>
        <h2 id="event-list-header">Open Streets Near You!</h2>
        <div className="total-events">
          <p>All Open Streets: <b>{events && events.length}</b></p>
        </div>
      </div>
      <div className="boros">
        <p>Brooklyn</p>
        <p>Queens</p>
        <p>Manhattan</p>
        <p>Bronx</p>
        <p>Staten Island</p>
      </div>
      {Object.values(events).slice(0, 20).map((event, i) => (
        <EventListItem key={i} event={event} />
      ))}
    </div>
  );
}

export default EventList;
