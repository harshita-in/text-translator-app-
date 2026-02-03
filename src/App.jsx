import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans">
        <nav className="fixed top-0 w-full z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              DevTools
            </div>
            <ul className="flex gap-8">
              <li><Link to="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">About</Link></li>
            </ul>
          </div>
        </nav>

        {/* Add padding top to account for fixed navbar */}
        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
