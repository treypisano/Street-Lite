import React, { useEffect, useRef } from "react";
import "./Modal.css";

function Modal({ onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="modal">
      <div className="modal-content" ref={modalRef}>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2 className="modal-header">What is an Open Street?</h2>
        <p>
          An NYC Open Street refers to a program implemented by the New York City government to temporarily close certain streets to vehicle traffic and open them up for pedestrian and community use. The program was initially introduced as a response to the COVID-19 pandemic to provide more space for physical distancing and outdoor activities when indoor spaces were limited.
        </p>
        <p>
          Under the NYC Open Streets initiative, specific streets are designated as car-free zones during specific times or days, allowing pedestrians, cyclists, and other non-motorized modes of transportation to utilize the space safely. The streets are typically chosen based on community input, population density, and connectivity to essential services.
        </p>
      </div>
    </div>
  );
}

export default Modal;
