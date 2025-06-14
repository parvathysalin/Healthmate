import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from './components/homepage';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import DoctorRecommendations from './components/Dashboard/DoctorRecommendations';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctors" element={<DoctorRecommendations />} />
      </Routes>
    </Router>
  );
}

export default App;

