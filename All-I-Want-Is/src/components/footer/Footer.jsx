import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeProvider'; // Import ThemeContext to change theme here
import './Footer.css'; // Assuming you want to style the footer separately

function Footer() {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div className={`footer ${isDarkTheme ? 'dark' : ''}`}>
      {/* Left-aligned: Contact Information */}
      <div className="footer-left">
        <p>Contact: hello@alliwantis.fyi</p>
      </div>

      {/* Center-aligned: Footer Phrase */}
      <div className="footer-center">
        <p>Made with ❤️ in New York, New York</p>
      </div>
    </div>
  );
}

export default Footer;
