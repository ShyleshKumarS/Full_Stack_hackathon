import React, { useState } from 'react';
import './AddData.css';
import './UpdateData.css';
import Alert from '../NewsBox/Alert';

function UpdateData({ id }) { // Modify to accept id as a prop
    const [responseMessage, setResponseMessage] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const handleFileChange = (event) => {
        // Access the selected file
        const selectedFile = event.target.files[0];
        // Set the selected file in state
        setImageFile(selectedFile);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            const response = await fetch(`/api/news/${id}`, { // Use the id in the API URL
                method: 'PATCH',
                body: formData,
            });
            const data = await response.json();
            console.log(data);
            setResponseMessage(data._id); 
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
                    <input 
                        type="file" 
                        name="img" 
                        id="image" 
                        accept="image/*" 
                        onChange={handleFileChange}
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {responseMessage && (
                <Alert message={"Successfully Inserted"}/>
            )}
        </div>
    );
}

export default UpdateData;
