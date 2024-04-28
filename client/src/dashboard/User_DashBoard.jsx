import React, { Component } from 'react';
import News from '../NewsBox/News';
import Navbar from '../Navbar/Navbar';
import RefreshButton from './RefreshButton'; // Import the RefreshButton component

export class User_DashBoard extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <RefreshButton />
        <News />
      </div>
    );
  }
}

export default User_DashBoard;
