import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeProvider'; // Import ThemeContext to change theme here
import './Banner.css'; // You can style this with CSS

function Banner() {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  // Handle about button click
  const handleAboutClick = () => {
    navigate('/about');
  };

  // Handle logo click to redirect to home
  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className={`banner ${isDarkTheme ? 'dark' : ''}`}>
      {/* Left aligned: Logo, Name */}
      <div className="banner-left">
        <button onClick={handleLogoClick} className="logo-button">
          <img
            src={isDarkTheme ? '/AllIWantTreeLogo.png' : '/AllIWantTreeLogo.png'} // Update the paths to your actual images
            alt="Logo"
            className="logo"
          />
          <h1 className="banner-title">All I Want Is</h1>
        </button>
      </div>

      {/* Right aligned: About button and Log In button */}
      <div className="banner-right">
        <button className="login-button">
          Log In
        </button>
      </div>
    </div>
  );
}

export default Banner;
