import { useState } from 'react';
import './WishForm.css';

function WishForm({ onSubmit, onClose }) {
  const [wishData, setWishData] = useState({
    title: '',
    link: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(wishData);
    onClose();
  };

  return (
    <div className="wish-form">
      <h1 className="wish-title">Dear Santa!</h1>
      <p className="wish-subtitle">ALL I WANT FOR CHRISTMAS IS...</p>
      
      <form onSubmit={handleSubmit} className="input-group">
        <input 
          type="text"
          placeholder="Title"
          className="wish-input"
          value={wishData.title}
          onChange={(e) => setWishData({...wishData, title: e.target.value})}
          // required
        />
        <input 
          type="url"
          placeholder="Link"
          className="wish-input"
          value={wishData.link}
          onChange={(e) => setWishData({...wishData, link: e.target.value})}
          // required
        />
        <input 
          type="text"
          placeholder="Description"
          className="wish-input"
          value={wishData.description}
          onChange={(e) => setWishData({...wishData, description: e.target.value})}
          // required
        />
        <button type="submit" className="submit-button">Add to Wishlist</button>
      </form>

      <div className="sleigh-footer">
        <img 
          src="/santa-sleigh.png" 
          alt="Santa's Sleigh" 
          className="sleigh-image"
        />
        <p className="promise-text">I PROMISE TO BE VERY, VERY GOOD</p>
      </div>
    </div>
  );
}

export default WishForm;