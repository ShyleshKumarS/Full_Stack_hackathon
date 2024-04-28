import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import Alert from './Alert';

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        const data = await response.json();
        setNews(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="container">
      <h1>Latest News</h1>
      {loading && <p>Loading...</p>}
      {error && <Alert message="Failed to fetch news" />}
      {!loading && !error && (
        <div className="row">
          {news.map((article) => (
            <div className="col-md-4" key={article._id}>
              <NewsItem article={article} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default News;
