import React, { useState } from 'react';
import UpdateData from './UpdateData'; // Import the UpdateData component

function AdminUpDel({ article, onDelete }) {
    const { _id, title, description, imageUrl } = article;
    const [fullDescription, setFullDescription] = useState('');

    const handleReadMore = async () => {
        try {
            const response = await fetch('/api/news/full', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description }),
            });
            const data = await response.json();
            setFullDescription(data.fullDescription);
            
        } catch (error) {
            console.error('Error fetching full description:', error);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this news?');
        if (confirmDelete) {
            try {
                const response = await fetch(`/api/news/${_id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    onDelete(_id); // Call the onDelete function passed from the parent component
                } else {
                    console.error('Error deleting news:', response.statusText);
                }
            } catch (error) {
                console.error('Error deleting news:', error);
            }
        }
    };

    const handleEdit = () => {
        // Pass the ID to the UpdateData component
        UpdateData(_id);
    };

    return (
        <div className="card">
            <img src={imageUrl} className="card-img-top" alt={title} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                {fullDescription && <p className="card-text">{fullDescription}</p>}
                {!fullDescription && <button type="button" className="btn btn-primary" onClick={handleReadMore}>Read More</button>}
                {/* Edit button */}
                <button type="button" className="btn btn-secondary mx-2" onClick={handleEdit}>Edit</button>
                {/* Delete button */}
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
}

export default AdminUpDel;
