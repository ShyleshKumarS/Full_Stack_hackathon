import React, { useState } from 'react';
import './AddData.css';

function AddData() {
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            const response = await fetch('/api/news/add', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            setResponseMessage(data.message); 
        } catch (error) {
            console.error('Error adding news:', error);
        }
    };

    return (
        <div className="form-wrapper">
            <h2>Add News</h2>
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
                    <label htmlFor="image">Upload Image </label>
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

export default AddData;
