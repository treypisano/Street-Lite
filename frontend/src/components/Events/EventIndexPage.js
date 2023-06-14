import React from "react";
import EventList from "./EventList";
import StreetMap from "../Map/StreetMap";

function EventIndexPage() {
    return (
        <div className="event-index">
            <h1>Events Index</h1>
            <div className="list-and-map">
                <EventList />
                <div className="google-map">
                       < StreetMap />
                </div>
            </div>
        </div>
    )
}

export default EventIndexPage;