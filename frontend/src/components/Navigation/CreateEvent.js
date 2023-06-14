import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import { createEvent } from "../../store/openstreets";

const CreateEvent = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [eventData, setEventData] = useState({
    dates: "",
    location: {
      startStreet: "",
      endStreet: "",
      mainStreet: "",
      latitude: "",
      longitude: "",
    },
  });

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevState) => ({
      ...prevState,
      location: {
        ...prevState.location,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createEvent(eventData));
    setEventData({
      dates: "",
      location: {
        startStreet: "",
        endStreet: "",
        mainStreet: "",
        latitude: "",
        longitude: "",
      },
    });
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create Event
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formDates">
              <Form.Label>Dates</Form.Label>
              <Form.Control
                type="text"
                name="dates"
                value={eventData.dates}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formStartStreet">
              <Form.Label>Start Street</Form.Label>
              <Form.Control
                type="text"
                name="startStreet"
                value={eventData.location.startStreet}
                onChange={handleLocationChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEndStreet">
              <Form.Label>End Street</Form.Label>
              <Form.Control
                type="text"
                name="endStreet"
                value={eventData.location.endStreet}
                onChange={handleLocationChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formMainStreet">
              <Form.Label>Main Street</Form.Label>
              <Form.Control
                type="text"
                name="mainStreet"
                value={eventData.location.mainStreet}
                onChange={handleLocationChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formLatitude">
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                type="text"
                name="latitude"
                value={eventData.location.latitude}
                onChange={handleLocationChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formLongitude">
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                type="text"
                name="longitude"
                value={eventData.location.longitude}
                onChange={handleLocationChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateEvent;
