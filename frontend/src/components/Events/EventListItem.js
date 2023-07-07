import React from "react";
import { Link } from "react-router-dom";
import './EventListItem.css';

const EventListItem = ({ event }) => {
  const days = event.dates.split(",").map(day => day.trim().toUpperCase());
  // const formattedDays = days.join(" ");
  const startStreet = capitalizeFirstLetter(event.location.startStreet);
  const endStreet = capitalizeFirstLetter(event.location.endStreet);

  function daysAsPTags(days) {
    let allTags = []

    days.forEach((day) => {
      allTags.push(<p className="day-tag">{day}</p>)
    })
    return allTags
  }

  return (
    <div className="event-list-item" key={event._id}>
      <div className="event-link">
        <Link to={`/events/${event._id}`} className="link">
          {capitalizeFirstLetter(event.location.mainStreet)}
        </Link>
        <p id="street-closed">Street Open:</p>
        <div className="event-dates">
          {daysAsPTags(days)}</div>
      </div>
      <div className="event-location">
        <p id="from-to">From</p> 
        {startStreet} 
        <p id="from-to">to</p> 
        {endStreet}
      </div>
    </div>
  );
};

const capitalizeFirstLetter = (str) => {
  const words = str.split(" ");
  const capitalizedWords = words.map((word) => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1).toLowerCase();
    return firstLetter + restOfWord;
  });
  return capitalizedWords.join(" ");
};


export default EventListItem;
