import React, { useState } from 'react';
import './AddData.css';

function UpdateData({ id }) { // Modify to accept id as a prop
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            const response = await fetch(`/api/news/update/${id}`, { // Use the id in the API URL
                method: 'PUT',
                body: formData,
            });
            const data = await response.json();
            setResponseMessage(data.message); 
        } catch (error) {
            console.error('Error updating news:', error);
        }
    };

    return (
        <div className="form-wrapper">
            <h2>Update News</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" placeholder="Enter title" required />
                </div>
                <div className="form-group">
                    <label htmlFor="genre">Genre</label>
                    <input type="text" name="genre" id="genre" placeholder="Enter genre" required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" id="description" placeholder="Enter description" required></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="image">Upload Image</label>
                    <input type="file" name="image" id="image" accept="image/*" required />
                </div>
                <button type="submit">Submit</button>
            </form>
            {responseMessage && (
                <div className="alerts">{responseMessage}</div>
            )}
        </div>
    );
}

export default UpdateData;
