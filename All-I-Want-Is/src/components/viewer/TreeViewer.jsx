// TreeViewer.jsx
import { useEffect, useState, useRef } from "react";
import supabase from "../supabaseClient";
import "./TreeViewer.css";

function TreeViewer({ userEmail }) {
  const [placedOrnaments, setPlacedOrnaments] = useState([]);
  const [placementSpots, setPlacementSpots] = useState([]);
  const [hoveredOrnament, setHoveredOrnament] = useState(null);
  const [selectedOrnament, setSelectedOrnament] = useState(null);
  const treeRef = useRef(null);

  const calculateSpots = () => {
    if (!treeRef.current) return [];

    const rect = treeRef.current.getBoundingClientRect();
    const spots = [];
    const rows = 8;
    const maxWidth = rect.width;
    const maxHeight = rect.height;

    for (let row = 0; row < rows; row++) {
      if (row === 0 || row === rows - 1) continue;

      const rowWidth = maxWidth * ((rows - row) / rows);
      const rowY = rect.bottom - maxHeight * (row / rows) + ((maxHeight/rows)*0.2); // THIS IS WHERE YOU TWEAK HOW HIGH ORNAMENTS ARE
      const ornamentsInRow = Math.ceil((rowWidth / maxWidth) * 3);

      for (let i = 0; i < ornamentsInRow; i++) {
        const xStart = rect.left + (maxWidth - rowWidth) / 2;
        const xStep = rowWidth / (ornamentsInRow + 1);
        const x = xStart + xStep * (i + 1);
        spots.push({ x, y: rowY });
      }
    }
    
    return spots;
  };

  const fetchUserOrnaments = async (spots) => {
    try {
      const { data, error } = await supabase
        .from("Users")
        .select('gifts')
        .eq('email', userEmail)
        .single();
  
      if (error) throw error;
  
      if (data?.gifts && spots.length > 0) {
        const ornamentsWithPositions = data.gifts.map((gift, index) => ({
          type: gift.ornament.type,
          image: gift.ornament.image,
          wish: {
            title: gift.wish.title,
            link: gift.wish.link,
            description: gift.wish.description
          },
          position: spots[index]
        }));
        setPlacedOrnaments(ornamentsWithPositions);
      }
    } catch (error) {
      console.error("Error fetching ornaments:", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const newSpots = calculateSpots();
      setPlacementSpots(newSpots);
      
      setPlacedOrnaments(prevOrnaments => 
        prevOrnaments.map((ornament, index) => ({
          ...ornament,
          position: newSpots[index]
        }))
      );
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleImageLoad = () => {
    const initialSpots = calculateSpots();
    setPlacementSpots(initialSpots);
    
    if (userEmail && initialSpots.length > 0) {
      fetchUserOrnaments(initialSpots);
    }
  };

  return (
    <div className="tree-viewer-container">
      <img
        ref={treeRef}
        src="/realisticChristmasTree.png"
        alt="Christmas Tree"
        className="tree-viewer-image"
        onLoad={handleImageLoad}
      />

      {placedOrnaments.map((ornament, index) => (
        <div key={index}>
          <img
            src={ornament.image}
            alt={ornament.type}
            className="viewer-ornament"
            style={{
              left: `${ornament.position.x}px`,
              top: `${ornament.position.y}px`,
              cursor: 'pointer'
            }}
            onMouseEnter={() => setHoveredOrnament(ornament)}
            onMouseLeave={() => setHoveredOrnament(null)}
            onClick={() => setSelectedOrnament(selectedOrnament === ornament ? null : ornament)}
          />
          
          {hoveredOrnament === ornament && (
            <div 
              className="viewer-ornament-preview"
              style={{
                position: 'absolute',
                left: `${ornament.position.x}px`,
                top: `${ornament.position.y - 60}px`,
              }}
            >
              <h3>{ornament.wish.title}</h3>
            </div>
          )}

          {selectedOrnament === ornament && (
            <div 
              className="viewer-ornament-details"
              style={{
                position: 'absolute',
                left: `${ornament.position.x}px`,
                top: `${ornament.position.y + 30}px`,
              }}
            >
              <div className="viewer-details-content">
                <h3>{ornament.wish.title}</h3>
                <p>{ornament.wish.description}</p>
                <a 
                  href={ornament.wish.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="viewer-details-link"
                >
                  View Item →
                </a>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default TreeViewer;