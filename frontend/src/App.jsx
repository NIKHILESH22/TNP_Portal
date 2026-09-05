import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RegisterDrive from './pages/RegisterDrive';
import Drives from './pages/Drives';
import DriveDetails from './pages/DriveDetails';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register-drive" element={<RegisterDrive />} />
        <Route path="/drives" element={<Drives />} />
        <Route path="/drives/:id" element={<DriveDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
