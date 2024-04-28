import React from 'react'; // Import your custom CSS file for additional styling

const RefreshButton = () => {
  const handleClick = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="container">
    <button onClick={handleClick} className="btn btn-primary  refresh-button p-2">
      Refresh Dashboard
    </button>
    </div>
  );
};

export default RefreshButton;
