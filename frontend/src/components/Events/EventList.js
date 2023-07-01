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
      <h2 id="event-list-header">Open Streets Near You!</h2>
      {Object.values(events).slice(0, 20).map((event, i) => (
        <EventListItem key={i} event={event} />
      ))}
    </div>
  );
}

export default EventList;
