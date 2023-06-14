import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchOpenStreet } from "../../store/openstreets";
import { clearEvents } from "../../store/openstreets";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Loader } from "@googlemaps/js-api-loader"

const EventShowPage = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const [places, setPlaces] = useState({})
    const currentEventId = params.eventId
    const currentEvent = useSelector(state => state.openStreet[0])

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_TREY_GOOGLE_API_KEY,
        libraries: ['places']
    });

    useEffect(() => {
        dispatch(clearEvents());
        dispatch(fetchOpenStreet(currentEventId))
            .then((event) => {
                if (isLoaded) {
                    const latLngObj = new window.google.maps.LatLng(event.location.latitude, event.location.longitude);

                    const map = new window.google.maps.Map(document.getElementById('map'), {
                        center: latLngObj,
                        zoom: 15
                    });

                    const request = {
                        location: latLngObj,
                        radius: '400',
                        type: ['restaurant']
                    };

                    const service = new window.google.maps.places.PlacesService(map);
                    service.nearbySearch(request, callback);
                }
            });
    }, [dispatch, currentEventId, isLoaded]);

    function callback(results, status) {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            // for (let i = 0; i < results.length; i++) {
            //     setPlaces({places, ...results[i]}) ;
            // }'
            setPlaces(results)
            console.log(places)
        }
    }

    if (Object.keys(places).length === 0) {
        return (
            <>
            <div id="map" style={{display: "none"}}></div>
        <div>loading!
        </div>
        </>)
    }

    // debugger
    const listItems = places.map(places => {
        return (
        <>
            <li>{places.name}</li>
            <li>{places.rating}</li>
            <li>{places.vicinity}</li>
        </>
        )
        
    })

    if (currentEvent) {
        return (
            <div className="event-show-page">
                <h1>Event Show Page</h1>
                <p>{currentEvent.dates}</p>
                <p>{currentEvent.location.mainStreet}</p>
                {listItems}
                <div id="map" style={{display: "none"}}></div>
            </div>
        )
    }
    
}

export default EventShowPage;