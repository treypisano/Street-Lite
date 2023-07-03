import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventListItem from "./EventListItem";
import { getEvents, fetchOpenStreets } from "../../store/openstreets";
import './EventIndex.css';

function EventList() {
  const events = useSelector((state) => state.openStreet);
  const [boroughClicked, setBoroughClicked] = useState(false)
  const dispatch = useDispatch();
  const [boroughEvents, setBoroughEvents] = useState()

  // Make a state of whether a boro has been clicked or no
  // If it is, dont display the default events, display the specific events
console.log("RUNNING EVENT LSIT")
  useEffect(() => {
    dispatch(fetchOpenStreets());
  }, [dispatch]);

  function handleBoroughClick (e) {
    let streetsByBorough = []
    const currentBorough = e.target.innerHTML
    setBoroughClicked(true)

    events.forEach((openStreet, i) => { // add the openStreet to the array if it is the boro that was clicked
      if (openStreet.location.borough === currentBorough) {
        streetsByBorough.push(openStreet)
      }
    })
    setBoroughEvents(streetsByBorough)
  }

  return (
    <div className="event-list">
      <div>
        <h2 id="event-list-header">Open Streets Near You!</h2>
        <div className="total-events">
          <p>All Open Streets: <b>{events && events.length}</b></p>
        </div>
      </div>
      <div className="boros">
        <p onClick={handleBoroughClick}>Brooklyn</p>
        <p onClick={handleBoroughClick}>Queens</p>
        <p onClick={handleBoroughClick}>Manhattan</p>
        <p onClick={handleBoroughClick}>Bronx</p>
        <p onClick={handleBoroughClick}>Staten Island</p>
      </div>
      { !boroughClicked 
      ?  
        Object.values(events).slice(0, 20).map((event, i) => (
          <EventListItem key={i} event={event} />
        )) 
      : 
        boroughEvents.slice(0, 20).map((event, i) => (
          <EventListItem key={i} event={event} />
        )) 
      }
    </div>
  );
}

export default EventList;
