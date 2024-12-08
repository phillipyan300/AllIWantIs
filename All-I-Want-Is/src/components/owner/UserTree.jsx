import { useEffect, useState, useRef } from "react";
import OrnamentPanel from "./OrnamentPanel";
import "./UserTree.css";

function UserTree() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [placedOrnaments, setPlacedOrnaments] = useState([]);
  const [placementSpots, setPlacementSpots] = useState([]);
  const [hoveredOrnament, setHoveredOrnament] = useState(null);
  const [selectedOrnament, setSelectedOrnament] = useState(null);
  const [wishes, setWishes] = useState([]);
  const treeRef = useRef(null);


  // Figure out coords for the ornaments
  const calculateSpots = () => {
      if (treeRef.current) {
        const rect = treeRef.current.getBoundingClientRect();
        // console.log(rect)
        const spots = [];
    
        // Number of rows and maximum ornaments per row
        const rows = 8; // More rows = smoother taper
        const maxWidth = rect.width; // Base width of the tree
        const maxHeight = rect.height; // Total height of the tree
    
        for (let row = 0; row < rows; row++) {
          // skip the first row
          if (row === 0) {
            continue;
          }

          // skip the last row
          if (row === rows - 1) {
            continue;
          }

          // Calculate the width of this row (tapering effect)
          const rowWidth = maxWidth * ((rows - row) / rows); // Decreases as row increases
    
          // Calculate the vertical position (y) for this row
          const rowY = rect.bottom - maxHeight * (row / rows) + ((maxHeight/rows)*0.4); // Add a little bit more so the phone screen is ok
    
          // Number of ornaments in this row
          const ornamentsInRow = Math.ceil((rowWidth / maxWidth) * 3); // Scale by width
    
          for (let i = 0; i < ornamentsInRow; i++) {
            // Calculate x position for each ornament in the row
            const xStart = rect.left + (maxWidth - rowWidth) / 2;// Center the row
            const xStep = rowWidth / (ornamentsInRow + 1); // Divide space between ornaments
            const x = xStart + xStep * (i + 1);
    
            spots.push({
              x: x,
              y: rowY,
            });
          }
        }
    
        setPlacementSpots(spots);
    
        // Update ornaments to align with spots after recalculation
        setPlacedOrnaments((prevOrnaments) =>
          prevOrnaments.map((ornament, index) => ({
            ...ornament,
            position: spots[index], // Reassign based on new spots
          }))
        );
    
        console.log("Calculated spots:", spots);
      };
    
  };

  // Handle screen resizing
  useEffect(() => {
    const handleResize = () => {
      calculateSpots();
    };

    // Attach resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Trigger calculation when the image is fully loaded
  const handleImageLoad = () => {
    calculateSpots();
  };

  const handlePlaceOrnament = (combinedData) => {
    console.log("Combined Data:", combinedData);
    const nextSpot = placementSpots[placedOrnaments.length];
    if (!nextSpot) {
      alert("No more spots available!");
      return;
    }

    // Update the state with the new ornament and wish
    setPlacedOrnaments([
      ...placedOrnaments,
      { 
        ...combinedData.ornament, 
        position: nextSpot,
        wish: combinedData.wish 
      },
    ]);

    // Add to wishes array
    setWishes([
      ...wishes,
      {
        ...combinedData.wish,
        ornamentId: placedOrnaments.length, // assuming this is set upon initialization, might need to change to allow edits
        ornamentType: combinedData.ornament.type
      }
    ]);
    // Lets log the ornament and the item
    console.log("Placed ornament:", combinedData.ornament);
    console.log("Placed wish:", combinedData.wish);

    // close the panel
    setIsPanelOpen(false);
  };



  // ORNAMENT HOVER AND CLICKING TREE VIEW

  const handleOrnamentHover = (ornament) => {
    setHoveredOrnament(ornament);
  };

  const handleOrnamentClick = (ornament) => {
    setSelectedOrnament(selectedOrnament?.id === ornament.id ? null : ornament);
  };

  // Handles removing an ornament, shifts all ornaments down, so always no gaps
  const handleRemoveOrnament = (ornamentToRemove) => {
    // Find the index of the ornament to remove
    const removeIndex = placedOrnaments.findIndex(o => o === ornamentToRemove);
    
    // Create new array without the removed ornament
    const newOrnaments = placedOrnaments.filter(o => o !== ornamentToRemove);
    
    // Reassign positions for all ornaments after the removed one
    const updatedOrnaments = newOrnaments.map((ornament, index) => {
      // If this ornament came after the removed one, give it the new position
      if (index >= removeIndex) {
        return {
          ...ornament,
          position: placementSpots[index] // Use the previous spot
        };
      }
      return ornament;
    });
  
    setPlacedOrnaments(updatedOrnaments);
    setSelectedOrnament(null);
  };

  const handleEditOrnament = (ornamentId) => {
    // To be implemented with edit functionality
    console.log("Edit ornament:", ornamentId);
  };



  return (
    <div className="user-tree-container">
      <img
        ref={treeRef}
        src="/realisticChristmasTree.png"
        alt="Christmas Tree"
        className="user-tree-logo"
        onLoad={handleImageLoad} // Trigger when the image loads
      />

      {/* Render placed ornaments */}
      {placedOrnaments.map((ornament, index) => (
        <div key={index} >
          <img
            src={ornament.image}
            alt={ornament.type}
            className="ornament"
            style={{
              left: `${ornament.position.x}px`,
              top: `${ornament.position.y}px`,
              cursor: 'pointer'
            }}
            onMouseEnter={() => setHoveredOrnament(ornament)}
            onMouseLeave={() => setHoveredOrnament(null)}
            onClick={() => setSelectedOrnament(selectedOrnament === ornament ? null : ornament)}
          />
          
          {/* Hover Preview */}
          {hoveredOrnament === ornament && (
            <div 
              className="ornament-preview"
              style={{
                position: 'absolute',
                left: `${ornament.position.x}px`,
                top: `${ornament.position.y - 60}px`,
              }}
            >
              <h3>{ornament.wish.title}</h3>
              <p className="preview-price">${ornament.wish.price}</p>
            </div>
          )}

          {/* Selected Ornament Details */}
          {selectedOrnament === ornament && (
            <div 
              className="ornament-details"
              style={{
                position: 'absolute',
                left: `${ornament.position.x}px`,
                top: `${ornament.position.y + 30}px`,
              }}
            >
              <div className="details-content">
                <h3>{ornament.wish.title}</h3>
                <p>{ornament.wish.description}</p>
                <a 
                  href={ornament.wish.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="details-link"
                >
                  View Item →
                </a>
                <div className="details-actions">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditOrnament(ornament);
                    }}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveOrnament(ornament);
                    }}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Add Ornament Button */}
      <button
        className="add-ornament-button"
        onClick={() => setIsPanelOpen(true)}
      >
        Add Ornaments
      </button>

      {/* Ornament Selection Panel */}
      <OrnamentPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        onSelect={(ornament) => handlePlaceOrnament(ornament)}
      />
    </div>
  );
}

export default UserTree;
