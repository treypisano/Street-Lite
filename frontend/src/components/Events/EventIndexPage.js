import React from "react";
import EventList from "./EventList";
import StreetMap from "../Map/StreetMap";
import { useSelector } from "react-redux";
import BoroughInfo from "./BoroughInfo";
import mapMarker from "../Map/mapmarkers.png"

function EventIndexPage() {
    const openStreets = useSelector(state => state.openStreet)

    return (
        <div className="event-index">
            <div className="list-and-map">
                <EventList />
                <div className="map-wrapper">
                    <p id="what-open-street">What is an Open Street?</p>
                    {/* <div id="map-info">
                        <p>Click a <img src={mapMarker} id="logo-in-text"/> to see more details!</p>
                    </div> */}
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