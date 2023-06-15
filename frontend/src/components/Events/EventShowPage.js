import React, {useEffect, useState, useRef} from "react";
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchOpenStreet } from "../../store/openstreets";
import { clearEvents } from "../../store/openstreets";
import { GoogleMap, useJsApiLoader, useLoadScript } from '@react-google-maps/api';
import { Loader } from "@googlemaps/js-api-loader"
import EventCalendar from "./EventCalendar";
import AttendList from "../Attends/AttendList";
import './EventShow.css';

const EventShowPage = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const [places, setPlaces] = useState({})
    const currentEventId = params.eventId
    const currentEvent = useSelector(state => state.openStreet[0])
    const mapRef = useRef(null)
    const history = useHistory()

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_TREY_GOOGLE_API_KEY,
        libraries: ['places']
    });

    
    useEffect(() => {
        dispatch(clearEvents());
    },[])

    useEffect(() => {
        if (currentEventId) {
            dispatch(fetchOpenStreet(currentEventId))
        }
                
    }, [dispatch, currentEventId]);

    useEffect(() => {
        if (isLoaded && currentEvent) {
            const latLngObj =  new window.google.maps.LatLng(currentEvent.location.latitude, currentEvent.location.longitude);
            
            let map = new window.google.maps.Map(document.createElement('div'));

            const request = {
                location: latLngObj,
                radius: '400',
                type: ['restaurant']
            };
            const service = new window.google.maps.places.PlacesService(map);
        
            service.nearbySearch(request, callback);
        }
    }, [isLoaded, currentEvent])

    function callback(results, status) {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            // for (let i = 0; i < results.length; i++) {
            //     setPlaces({places, ...results[i]}) ;
            // }'
            setPlaces(results)
        }
    }

    if (!isLoaded) {
        return (<div>loading</div>)
    }

    if (Object.keys(places).length === 0) {
        return (
        <>
            <div id="map" style={{display: "none"}}></div>
            <div>
                loading!
            </div>
        </>
        )
    }

    const listItems = places.map(places => {
        return (
        <div className="single-place">
            <div>{places.name}</div>
            <div>{places.rating}</div>
            <div>{places.vicinity}</div>
        </div>
        )
        
    })

    if (currentEvent) {
        return (
            <div className="event-show-page">
                <h1>Event Show Page</h1>
                <div className="event-body">
                    <div className="event-info">
                        <p>Event Days: </p>
                        <EventCalendar />
                        <div id='asterisks'>***</div>
                        <p>Main Street: {currentEvent.location.mainStreet}</p>
                        <div id='asterisks'>***</div>
                        <p>Start Street: {currentEvent.location.startStreet}</p>
                        <div id='asterisks'>***</div>
                        <p>End Street: {currentEvent.location.endStreet}</p>
                        <div id='asterisks'>***</div>
                        <div>
                            {listItems}
                            <div id="map" style={{display: "none"}}></div>
                        </div>
                    </div>
                    <div className="event-users">
                        <div className="attendees">
                            Attendees
                            <AttendList />
                        </div>
                        <div className="comments">
                            Comments
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default EventShowPage;