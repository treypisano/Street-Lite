import React from "react";
import EventList from "./EventList";
import StreetMap from "../Map/StreetMap";
import { useSelector } from "react-redux";
import BoroughInfo from "./BoroughInfo";

function EventIndexPage() {
    const openStreets = useSelector(state => state.openStreet)

    return (
        <div className="event-index">
            <div className="list-and-map">
                <EventList />
                <div className="map-wrapper">
                    <div id="map-info">
                        <p>Click a lamp to see more details about an Open Street!</p>
                    </div>
                    <BoroughInfo />
                    <div className="google-map">
                        < StreetMap />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventIndexPage;