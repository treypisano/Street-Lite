import React, { useState } from "react";
import EventList from "./EventList";
import StreetMap from "../Map/StreetMap";
import { useSelector } from "react-redux";
import BoroughInfo from "./BoroughInfo";
import mapMarker from "../Map/mapmarkers.png";
import Modal from "./Modal";

function EventIndexPage() {
  const openStreets = useSelector((state) => state.openStreet);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="event-index">
      <div className="list-and-map">
        <EventList />
        <div className="map-wrapper">
          <p id="what-open-street" onClick={handleOpenModal}>
            What is an Open Street?
          </p>
          <BoroughInfo />
          <div className="google-map">
            <StreetMap />
          </div>
        </div>
      </div>
      {isModalOpen && <Modal onClose={handleCloseModal} />}
    </div>
  );
}

export default EventIndexPage;
