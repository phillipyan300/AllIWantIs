import { useNavigate } from 'react-router-dom';
import './GoToTree.css';
import "../login/Login.css";
import ExistingTreeButton from './ExistingTreeButton';

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
      <ExistingTreeButton />
    </div>
  );
}

export default GoToTree;
