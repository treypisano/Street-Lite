import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import image from '../../image/image.webp'

const EventListItem = ({ event }) => {
  // const event = props.openStreet;
  // console.log(event);

  return (
    <div className="event-list-item" key={event._id}>
      <Link to={`/events/${event._id}`}>
        Event Show Page Link
        {/* <div className='index-image-container'>
                    <img src={image} className="listing-pic" alt="" />
                    <img src={listing.photoUrls.length > 0 ? listing.photoUrls[0] : image } alt="" className='listing-pic' />
                </div> */}
      </Link>
      <br></br>
      <div className="event-dates">Event Dates: {event.dates}</div>
      <div className="event-location">
        Main Street: {event.location.mainStreet}
      </div>
    </div>
  );
};

export default EventListItem;
