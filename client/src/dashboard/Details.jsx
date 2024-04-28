import React, { useState, useEffect } from 'react';
import './Deatails.css'

function Details(article) {
    const { _id,title, genre,description, img } = article;
    console.log(article)
    useEffect(() => {
        // Fetch full description when component mounts
        fetchFullDescription();
    }, []);

    const fetchFullDescription = async () => {
        try {
            const response = await fetch(`/api/news/${_id}`, { // Use the id in the API URL
                method: 'POST'
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error updating news:', error);
        }
    };

    return (
        <div className="container">
            <div className="header-bar">
                <button className="back-btn" onClick={() => window.history.back()}>Back</button>
            </div>
            <div className="details-wrapper">
                <div className="details-content">
                    <img className="details-img" src={img} alt="Image" />
                    <div className="details-info">
                        <div className="details-title">{title}</div>
                        <div className="details-genre">{genre}</div>
                        <div className="details-description">{description}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details;

