import React, { useState, useEffect } from 'react';
import AdminUpDel from './AdminUpDel';

function AdminDashboard() {
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

  const handleDelete = (id) => {
    setNews(news.filter(item => item._id !== id));
  };

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching news.</p>}
      {!loading && !error && (
        <div className="row">
          {news.map((article) => (
            <div className="col-md-4" key={article._id}>
              <AdminUpDel article={article} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
