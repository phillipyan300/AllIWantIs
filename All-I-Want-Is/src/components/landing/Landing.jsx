
import './Landing.css';
import WelcomeBanner from './WelcomeBanner';
import Tree from './Tree';
import GoToTree from './GoToTree';

function Landing() {
  return (
    <div className="landing">
      <WelcomeBanner />
      <Tree />
      <GoToTree />
      <button className="help-button">?</button>
    </div>
  );
}

export default Landing;
