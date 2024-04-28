import React, { Component } from 'react';
import News from '../NewsBox/News';
import Navbar from '../Navbar/Navbar_log';
import './Dashboard.css';
import AdminDashboard from './Admin_Dash';
import RefreshButton from './RefreshButton'; // Import the RefreshButton component

export default class Dashboard extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div className='dashboard'>
          {/* Include the refresh button */}
          <RefreshButton />
          <AdminDashboard />
        </div>
      </>
    );
  }
}
