import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import image from '../../image/image.webp'
import './EventListItem.css'

const EventListItem = ({ event }) => {
  // const event = props.openStreet;
  // console.log(event);

  return (
    <div className="event-list-item" key={event._id}>
      <Link to={`/events/${event._id}`}>
        {event.location.mainStreet}
        {/* <div className='index-image-container'>
                    <img src={image} className="listing-pic" alt="" />
                    <img src={listing.photoUrls.length > 0 ? listing.photoUrls[0] : image } alt="" className='listing-pic' />
                </div> */}
      </Link>
      <div className="event-location">
        From {event.location.startStreet} to {event.location.endStreet}
      </div>
      <div className="event-dates">Days Open: {event.dates}</div>
    </div>
  );
};

export default EventListItem;
