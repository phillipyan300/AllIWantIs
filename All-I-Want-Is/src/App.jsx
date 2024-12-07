import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Banner from './components/banner/Banner';
// import Footer from './components/footer/Footer';
import Landing from './components/landing/Landing';
import Login from './components/login/Login';
import Dashboard from './components/owner/dashboard';
import { ThemeProvider } from './components/contexts/ThemeProvider';
import './App.css';

function App() {
  return (
    <ThemeProvider>
        <Router>
          <Banner />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/oauth/callback" element={<Dashboard />} />
          </Routes>
          {/* <Footer /> */}
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
