import './OrnamentPanel.css';

function OrnamentPanel({ isOpen, onClose }) {
  // Define ornament types and corresponding image file names
  const ornaments = [
    { type: "Traditional Ball", image: "/balls/ball1.png" },
    { type: "Star", image: "/balls/ball2.png" },
    { type: "Angel", image: "/balls/ball3.png" },
    { type: "Candy Cane", image: "/balls/ball4.png" },
    { type: "Snowflake", image: "/balls/ball5.png" },
    { type: "Bell", image: "/balls/ball6.png" },
    { type: "Icicle", image: "/balls/ball7.png" },
    { type: "Gingerbread", image: "/balls/ball8.png" },
    { type: "Pine Cone", image: "/balls/ball9.png" },
    { type: "Gift Box", image: "/balls/ball10.png" },
    { type: "Holly", image: "/balls/ball11.png" },
    { type: "Ribbon", image: "/balls/ball12.png" },
  ];

  return (
    <div className={`ornament-panel ${isOpen ? 'open' : ''}`}>
      <div className="ornament-panel-content">
        <button className="close-panel" onClick={onClose}>×</button>
        <h2>Choose an Ornament</h2>
        <div className="ornament-grid">
          {ornaments.map((ornament, index) => (
            <div key={index} className="ornament-item">
              <img
                src={ornament.image}
                alt={ornament.type}
                className="ornament-image"
              />
              <p>{ornament.type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrnamentPanel;
