import React, { useState } from 'react';
import Details from '../dashboard/Details';

function NewsItem({ article }) {
    const { _id,title, description, image } = article;
    const [fullDescription, setFullDescription] = useState('');
    const [click,setClick]=useState(false);

    const handleReadMore = async () => {
        setClick(true);
    };

    return (
        <div className="card">
            <img src={`data:image/jpeg;base64,${image}`} className="card-img-top" alt={title} />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description.slice(0,200)}...</p>
                <button type="button" className="btn btn-primary">Read More</button>
            </div>
            {click && <Details article={article}/>}
        </div>
    );
}

export default NewsItem;
