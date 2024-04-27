import React, { useState } from 'react';

function Alert({ message }) {
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false);
    };

    return (
        <>
            {show && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {message}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={handleClose}></button>
                </div>
            )}
        </>
    );
}

export default Alert;
