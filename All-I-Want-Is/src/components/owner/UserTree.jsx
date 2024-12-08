import { useEffect, useState } from "react";
import OrnamentPanel from "./OrnamentPanel";
import "./UserTree.css";

function UserTree() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);


  return (
    <div className="user-tree-container">
      <img
        src="/realisticChristmasTree.png"
        alt="Christmas Tree"
        className="user-tree-logo"
      />
      <button 
        className="add-ornament-button"
        onClick={() => setIsPanelOpen(true)}
      >
        Add Ornaments
      </button>


      <OrnamentPanel 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)}
      />
    </div>
  );
}

export default UserTree;
