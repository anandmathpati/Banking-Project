import React from 'react';

const Card = ({ title, description, onClick }) => {
  return (
    <div className="card mb-3 shadow-sm" onClick={onClick} style={{ cursor: 'pointer', transition: 'transform 0.2s' }}>
      <div className="card-body text-center">
        <h2 className="card-title h5">{title}</h2>
        <p className="card-text">{description}</p>
        <button className="btn btn-primary">Explore</button>
      </div>
    </div>
  );
};

export default Card;
