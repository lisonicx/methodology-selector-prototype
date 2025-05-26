import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Questionnaire from './pages/Questionnaire';
import Methodologies from './pages/Methodologies';
import History from './pages/History';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar/>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/methodologies" element={<Methodologies />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;