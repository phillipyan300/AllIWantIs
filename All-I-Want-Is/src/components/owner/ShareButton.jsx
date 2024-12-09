// components/ShareButton/ShareButton.jsx
import { useState } from 'react';
import './ShareButton.css';

function ShareButton({ userEmail }) {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  


  const handleShare = () => {
    const encodedEmail = encodeURIComponent(userEmail);
    const url = `${window.location.origin}/tree/${encodedEmail}`;
    setShareUrl(url);
    setShowShareOptions(true);
  };

  return (
    <div className="share-container">
      <button className="share-button" onClick={handleShare}>
        Share Your Tree
      </button>
      
      {showShareOptions && (
        <div className="share-options">
          <p className="share-text">Share this link with your friends:</p>
          <div className="share-url-container">
            <input 
              className="share-url-input"
              value={shareUrl} 
              readOnly 
              onClick={(e) => e.target.select()}
            />
            <button 
              className="copy-button"
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
                alert('Link copied!');
              }}
            >
              Copy Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShareButton;