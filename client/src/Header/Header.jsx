import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar_home.jsx';
import './Header.css';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: 'cursive', // Use any fancy font you prefer
    color: theme.palette.primary.light, // Use Material UI primary color
  },
  loginText: {
    fontSize: '1.2em',
    fontWeight: 'bold',
    marginTop: '20px',
    opacity: 0, // Initially hide the login text
    transition: 'opacity 1s ease-in-out', // Apply fade-in animation
  },
}));

const Header = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [typedText, setTypedText] = useState('');
    const classes = useStyles(); // Apply custom CSS styles
  
    useEffect(() => {
      setTimeout(() => {
        setShowPopup(true);
        typeNewsTitle();
      }, 1000);
    }, []);
  
    const typeNewsTitle = () => {
      const newsTitle = "Breaking News Headlines\nLogin for seeing the news!";
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index <= newsTitle.length) {
          const typedText = newsTitle.substring(0, index);
          setTypedText(typedText);
          index++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            setTypedText('');
            typeNewsTitle(); // Call the function again after resetting typedText
          }, 2000); // Wait for 2 seconds before resetting
        }
      }, 150); 
    };
  
    return (
      <div>
        <Navbar />
        <div className='headerImg'>
          <img src="/background_news.png" alt="Background News" />
        </div>
        {showPopup && (
          <div>
            <div className="fade-popup">
              <Typography variant="h2" className={classes.title} id="newsTitle">{typedText}</Typography>
            </div>
          </div>
        )}
      </div>
    );
  };
  

export default Header;
