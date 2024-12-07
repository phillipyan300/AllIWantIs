import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Banner from './components/banner/Banner';
import Footer from './components/footer/Footer';
import Landing from './components/landing/Landing';
import Login from './components/login/Login';
import About from './components/about/About';
import Dashboard from './components/owner/Dashboard';
import { ThemeProvider } from './components/contexts/ThemeProvider';
import './App.css';

// Testing purposes only
import InsertTableTest from './tests/userTableInsertionTest';

function App() {
  return (
    <ThemeProvider>
        <Router>
          {/* <Banner /> */}
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/oauth/callback" element={<Dashboard />} />
            <Route path="/test-insert" element={<InsertTableTest />} />
          </Routes>
          <Footer />
        </Router>
    </ThemeProvider>
  );
}

export default App;
