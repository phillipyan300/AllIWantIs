import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login"
import Landing from "./components/landing/Landing"
import Dashboard from "./components/owner/dashboard"

// To do
// Add theme, add footer and header
// Add css to modify for both phone and computer
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/oauth/callback" element={<Dashboard />} />
      </Routes>
    </Router>

  );
}

export default App;