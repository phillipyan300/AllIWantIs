import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Banner from './components/banner/Banner';
import Footer from './components/footer/Footer';
import Landing from './components/landing/Landing';
import Login from './components/login/Login';
import About from './components/about/About';
import Dashboard from './components/owner/Dashboard';
import DashboardViewer from './components/viewer/DashboardViewer';
import SnowTest from './tests/SnowTest';
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
            <Route path="/tree/:email" element={<DashboardViewer />} />

            <Route path="/test-insert" element={<InsertTableTest />} />
            <Route path="/test-snow" element={<SnowTest />} />
          </Routes>
          <Footer />
        </Router>
    </ThemeProvider>
  );
}

export default App;
