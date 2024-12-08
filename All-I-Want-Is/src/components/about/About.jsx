import { useNavigate } from 'react-router-dom';
import StepCard from './StepCard';
import './About.css';



function About() {
    const navigate = useNavigate();
  
    return (
      <div className="about">
        <div className="about-content">
          <div className="tree-icon">
            <span className="tree">🎄</span>
            <span className="santa-hat">🎅</span>
          </div>
          
          <h1 className="title">DECO MY TREE</h1>
          <h2 className="subtitle">HOW TO USE</h2>
          
  
          <div className="steps-container">
            <StepCard number="1" title="Log in with Google"/>
            <StepCard number="2" title="Add Each Gift You Want As An Ornament to Your Wishlist Tree" />
            <StepCard number="3" title="Share Your Tree with Friends to Let Them Gift Anonymously" />
            <StepCard number="4" title="Visit Friends' Trees and Start Gifting" />

          </div>
  
          <button 
            className="next-button"
            onClick={() => navigate('/')}
          >
            NEXT
          </button>
        </div>
      </div>
    );
  }
  
  export default About;