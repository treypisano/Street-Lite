import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchOpenStreet } from "../../store/openstreets";
import { clearEvents } from "../../store/openstreets";
import {
  GoogleMap,
  useJsApiLoader,
  useLoadScript,
} from "@react-google-maps/api";
import { Loader } from "@googlemaps/js-api-loader";
import EventCalendar from "./EventCalendar";
import AttendList from "../Attends/AttendList";
import "./EventShow.css";
import "./EventShow.css";
import CommentForm from "../Comments/CommentForm";
import CommentIndex from "../Comments/CommentsIndex";
import locationicon from '../../images/location-dot-solid.svg';
import calendaricon from '../../images/calendar-regular.svg';

const capitalizeFirstLetter = (str) => {
  const words = str.split(" ");
  const capitalizedWords = words.map((word) => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1).toLowerCase();
    return firstLetter + restOfWord;
  });
  return capitalizedWords.join(" ");
};

const EventShowPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [places, setPlaces] = useState({});
  const currentEventId = params.eventId;
  const currentEvent = useSelector((state) => state.openStreet[0]);
  const mapRef = useRef(null);
  const history = useHistory();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_TREY_GOOGLE_API_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    dispatch(clearEvents());
  }, []);

  useEffect(() => {
    if (currentEventId) {
      dispatch(fetchOpenStreet(currentEventId));
    }
  }, [dispatch, currentEventId]);

  useEffect(() => {
    if (isLoaded && currentEvent) {
      const latLngObj = new window.google.maps.LatLng(
        currentEvent.location.latitude,
        currentEvent.location.longitude
      );

      let map = new window.google.maps.Map(document.createElement("div"));

      const request = {
        location: latLngObj,
        radius: "400",
        type: ["restaurant"],
      };
      const service = new window.google.maps.places.PlacesService(map);
      service.nearbySearch(request, callback);
    }
  }, [isLoaded, currentEvent]);

  function callback(results, status) {
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      // for (let i = 0; i < results.length; i++) {
      //     setPlaces({places, ...results[i]}) ;
      // }'
      setPlaces(results);

    }
  }
  if (!isLoaded) {
    return <div>loading</div>;
  }

  if (Object.keys(places).length === 0) {
    return (
      <>
        <div id="map" style={{ display: "none" }}></div>
        <div>loading!</div>
      </>
    );
  }
  const listItems = places.map((place) => {
    const photos = place.photos;
    let photoUrl;
    if (photos) {
      photoUrl = photos[0].getUrl();
    }

    return (
      <div className="single-place">
        <div className="single-place-text">
          <div className="single-place-name">{place.name}</div>
          <div className="single-place-rating">
            Rating: {place.rating} Stars
          </div>
          <div className="single-place-vicinity">{place.vicinity}</div>
        </div>
        <div className="single-place-picture">
          <img src={photoUrl}></img>
        </div>
      </div>
    );
  });

  if (currentEvent) {
    return (
      <div className="event-show-page">
        <h1>{capitalizeFirstLetter(currentEvent.location.mainStreet)}</h1>
        <div className="event-body">
          <div className="event-info">
            <div className="eventday-subheading">
              <img src={calendaricon} id="calendaricon"></img>
              <h4>Event Days </h4>
            </div>
            <EventCalendar />
            <div className="eventlocation-subheading">
              <img src={locationicon} id="locationicon"></img>
              <h4>Location</h4>
            </div>
            <h5>{currentEvent.location.mainStreet}</h5>
            <p>Between: {currentEvent.location.startStreet} & {currentEvent.location.endStreet}</p>
            <div id="nearby-places">Nearby Restaurants</div>
            <div className="all-places">
              {listItems}
              <div id="map" style={{ display: "none" }}></div>
            </div>
          </div>
          <div className="event-users">
            <div className="attendees">
              Attendees
              <AttendList />
            </div>
            <div className="comments">
              {/* <h2>What People are Saying</h2> */}
              <CommentForm />
              <CommentIndex />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default EventShowPage;
