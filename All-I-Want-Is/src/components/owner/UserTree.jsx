import { useEffect, useState, useRef } from "react";
import OrnamentPanel from "./OrnamentPanel";
import supabase from "../supabaseClient";
import "./UserTree.css";


function UserTree({ userEmail, userName, userAvatarLink }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [placedOrnaments, setPlacedOrnaments] = useState([]);
  const [placementSpots, setPlacementSpots] = useState([]);
  const [hoveredOrnament, setHoveredOrnament] = useState(null);
  const [selectedOrnament, setSelectedOrnament] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [wishes, setWishes] = useState([]);
  const treeRef = useRef(null);

  // Function to calculate spots and return them
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
      const rowY = rect.bottom - maxHeight * (row / rows) + ((maxHeight/rows)*0.2);// THIS IS WHERE YOU TWEAK HOW HIGH ORNAMENTS ARE
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

  // Function to update ornament positions with new spots
  const updateOrnamentPositions = (currentSpots, ornaments) => {
    if (!ornaments) return;
    
    return ornaments.map((ornament, index) => ({
      ...ornament,
      position: currentSpots[index]
    }));
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
        // Restructure each ornament to match the flat format
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
        console.log(ornamentsWithPositions)
      }
    } catch (error) {
      console.error("Error fetching ornaments:", error);
    }
  };

  // Handle initial load and window resize
  useEffect(() => {
    const handleResize = () => {
      const newSpots = calculateSpots();
      setPlacementSpots(newSpots);
      
      // Update existing ornaments with new positions
      setPlacedOrnaments(prevOrnaments => 
        updateOrnamentPositions(newSpots, prevOrnaments)
      );
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle image load
  const handleImageLoad = () => {
    const initialSpots = calculateSpots();
    setPlacementSpots(initialSpots);
    
    if (userEmail && initialSpots.length > 0) {
      fetchUserOrnaments(initialSpots);
    }
  };

  // Save ornaments to database
  const saveOrnamentsToDatabase = async (ornaments) => {
    try {
      const formattedOrnaments = ornaments.map(({ position, type, image, wish }) => ({
        ornament: {
          type: type,
          image: image
        },
        wish: wish
      }));
  
      const toInsert = {
        name: userName,
        avatar_url: userAvatarLink,
        email: userEmail,
        gifts: formattedOrnaments
      };
  
      const { error } = await supabase
        .from("Users")
        .upsert(toInsert);
  
      if (error) throw error;
    } catch (error) {
      console.error("Error saving ornaments:", error);
    }
  };

  // Handle placing new ornament
  const handlePlaceOrnament = async (combinedData) => {
    if (editMode?.isEditing) {
      const updatedOrnaments = placedOrnaments.map(ornament =>
        ornament === editMode.ornamentToEdit
          ? { ...ornament, wish: combinedData.wish }
          : ornament
      );
      setPlacedOrnaments(updatedOrnaments);
      await saveOrnamentsToDatabase(updatedOrnaments);
      setEditMode(null);
    } else {
      const nextSpot = placementSpots[placedOrnaments.length];
      if (!nextSpot) {
        alert("No more spots available!");
        return;
      }

      const newOrnament = {
        ...combinedData.ornament,
        position: nextSpot,
        wish: combinedData.wish
      };

      const updatedOrnaments = [...placedOrnaments, newOrnament];
      setPlacedOrnaments(updatedOrnaments);
      await saveOrnamentsToDatabase(updatedOrnaments);

      setWishes([
        ...wishes,
        {
          ...combinedData.wish,
          ornamentId: placedOrnaments.length,
          ornamentType: combinedData.ornament.type
        }
      ]);
    }
    console.log("Ornaments now:", placedOrnaments);
    setIsPanelOpen(false);
  };

  // Handle removing ornament
  const handleRemoveOrnament = async (ornamentToRemove) => {
    const removeIndex = placedOrnaments.findIndex(o => o === ornamentToRemove);
    const newOrnaments = placedOrnaments.filter(o => o !== ornamentToRemove);
    
    const updatedOrnaments = newOrnaments.map((ornament, index) => ({
      ...ornament,
      position: placementSpots[index]
    }));

    setPlacedOrnaments(updatedOrnaments);
    await saveOrnamentsToDatabase(updatedOrnaments);
    setSelectedOrnament(null);
  };

  const handleEditOrnament = (ornamentToEdit) => {
    setEditMode({
      isEditing: true,
      ornamentToEdit: ornamentToEdit
    });
    setIsPanelOpen(true);
  };

  return (
    <div className="user-tree-container">
      <img
        ref={treeRef}
        src="/realisticChristmasTree.png"
        alt="Christmas Tree"
        className="user-tree-logo"
        onLoad={handleImageLoad}
      />

      {placedOrnaments.map((ornament, index) => (
        <div key={index}>
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
            </div>
          )}

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

      <button
        className="add-ornament-button"
        onClick={() => setIsPanelOpen(true)}
      >
        Add A Gift You Want!
      </button>

      <OrnamentPanel
        isOpen={isPanelOpen}
        onClose={() => {
          setIsPanelOpen(false);
          setEditMode(null);
        }}
        onSelect={handlePlaceOrnament}
        editMode={editMode}
      />
    </div>
  );
}

export default UserTree;