import { useNavigate } from 'react-router-dom';
import './GoToTree.css';

function GoToTree() {
  const navigate = useNavigate();

  return (
    <div className="go-to-tree-container">
      <button
        className="make-tree"
        onClick={() => navigate('/about')}
      >
        Make My Tree
      </button>
      <button
        className="existing-tree"
        onClick={() => navigate('/existing-tree')}
      >
        I Already Have a Tree
      </button>
    </div>
  );
}

export default GoToTree;
