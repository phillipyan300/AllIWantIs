import { useState, useEffect} from 'react';
import './OrnamentPanel.css';
import WishForm from './wishForm/WishForm';'./wishForm/WishForm.jsx';



function OrnamentPanel({ isOpen, onClose, onSelect, editMode }) {
    const [showWishForm, setShowWishForm] = useState(false);
    const [selectedOrnament, setSelectedOrnament] = useState(null);
  // Define ornament types and corresponding image file names
  const ornaments = [
    { type: "Ball 1", image: "/balls/ball1.png" },
    { type: "Ball 2", image: "/balls/ball2.png" },
    { type: "Ball 3", image: "/balls/ball3.png" },
    { type: "Ball 4", image: "/balls/ball4.png" },
    { type: "Ball 5", image: "/balls/ball5.png" },
    { type: "Ball 6", image: "/balls/ball6.png" },
    { type: "Ball 7", image: "/balls/ball7.png" },
    { type: "Ball 8", image: "/balls/ball8.png" },
    { type: "Ball 9", image: "/balls/ball9.png" },
    { type: "Ball 10", image: "/balls/ball10.png" },
    { type: "Ball 11", image: "/balls/ball11.png" },
    { type: "Ball 12", image: "/balls/ball12.png" },
  ];


  // Handle edit mode upon load
  useEffect(() => {
    if (editMode?.isEditing) {
      setSelectedOrnament(editMode.ornamentToEdit);
      setShowWishForm(true);
    } else {
      setShowWishForm(false);
      setSelectedOrnament(null);
    }
  }, [editMode]);

  // For the initial ornament selection, will go to wishlist, so currently storing until wishlist returns
  const handleOrnamentClick = (ornament) => {
    setSelectedOrnament(ornament);
    setShowWishForm(true);
  };

  // final return package to userTree
  const handleWishSubmit = (wishData) => {
    // Combine ornament and wish data
    const combinedData = {
      ornament: selectedOrnament,
      wish: wishData
    };
    onSelect(combinedData);
    setShowWishForm(false);
    onClose();
  };

  const handleClose = () => {
    setShowWishForm(false);
    onClose();
  };

  // Either has empty load, or ornament panel, or wish form
  return (
    <div className={`ornament-panel ${isOpen ? 'open' : ''}`}>
      <div className="ornament-panel-content">
        <button className="close-panel" onClick={handleClose}>×</button>
        
        {!showWishForm ? (
          <>
            <h2>Choose an Ornament</h2>
            <div className="ornament-grid">
              {ornaments.map((ornament, index) => (
                <div
                  key={index}
                  className="ornament-item"
                  onClick={() => handleOrnamentClick(ornament)}
                >
                  <img
                    src={ornament.image}
                    alt={ornament.type}
                    className="ornament-image"
                  />
                  <p>{ornament.type}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <WishForm 
            onSubmit={handleWishSubmit}
            onClose={() => setShowWishForm(false)}
            initialData={editMode?.isEditing ? editMode.ornamentToEdit.wish : null}
          />
        )}
      </div>
    </div>
  );
}

export default OrnamentPanel;
