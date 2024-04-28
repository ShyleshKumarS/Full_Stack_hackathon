import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './login/Login.jsx';
import Home from './home/Home.jsx';
import Dashboard from './dashboard/Dashboard.jsx';
import Error from './404page/Error.jsx';
import AddData from './dashboard/AddData.jsx';
import AdminDashboard from './dashboard/Admin_Dash.jsx';
import User_DashBoard from './dashboard/User_DashBoard.jsx';
import RefreshButton from './dashboard/RefreshButton.jsx'; // Import the RefreshButton component

function App() {
  const [userRole, setUserRole] = useState(null);

  // Check if the user is authenticated based on the presence of the token in local storage
  const isAuthenticated = localStorage.getItem('accessToken') !== null;

  useEffect(() => {
    // Decode the JWT token and extract the user's role
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        console.log(decodedToken);
        setUserRole(decodedToken.role);
      } catch (error) {
        // Handle decoding errors, such as invalid tokens
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={userRole === 'admin' ? <Dashboard /> : <User_DashBoard />}
          />
          <Route path="/add" element={<AddData />} />
          {/* 404 Not Found page */}
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
