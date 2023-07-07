import React from 'react';

const TechnologiesModal = ({ isOpen, toggleModal }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal" onClick={toggleModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">Technologies Used</h3>
        <ul>
          <li>MongoDB</li>
          <li>Express</li>
          <li>React/Node</li>
          <li>Google Maps API</li>
          <li>NYC Open Data API</li>
        </ul>
        <button className="close-button" onClick={toggleModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default TechnologiesModal;
