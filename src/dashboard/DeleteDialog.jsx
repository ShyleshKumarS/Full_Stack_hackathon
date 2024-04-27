import React from 'react';

const DeleteDialog = ({ isOpen, response, onClose }) => {
  return (
    <div className={`delete-dialog ${isOpen ? 'open' : ''}`}>
      <div className="dialog-content">
        <h2>Delete News</h2>
        <p>{response}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DeleteDialog;
