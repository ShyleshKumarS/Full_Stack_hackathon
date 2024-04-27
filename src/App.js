import './App.css';
import Login from './login/Login.jsx';
import Home from './home/Home.jsx';
import Navbar from './Navbar/Navbar.jsx'; // Changed to NavbarDefault
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header/Header.jsx';
import Dashboard from './dashboard/Dashboard.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/dash' element={<Dashboard/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
