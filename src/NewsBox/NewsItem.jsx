import React, { useState } from 'react';

function NewsItem({ article }) {
    const { title, description, imageUrl } = article;
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

    return (
        <div className="card">
            <img src={imageUrl} className="card-img-top" alt={title} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <button type="button" className="btn btn-primary" onClick={handleReadMore}>Read More</button>
            </div>
        </div>
    );
}

export default NewsItem;
