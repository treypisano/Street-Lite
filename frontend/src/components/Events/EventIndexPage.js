import React from "react";
import EventList from "./EventList";
import StreetMap from "../Map/StreetMap";

function EventIndexPage() {
    return (
        <div className="event-index">
            <div className="list-and-map">
                <EventList />
                <div className="map-wrapper">
                    <div>Check out some Open Streets!</div>
                    <div className="google-map">
                        < StreetMap />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventIndexPage;