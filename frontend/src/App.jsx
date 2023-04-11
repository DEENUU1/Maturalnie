import './App.css';
import HomePage from './pages/HomePage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<HomePage/>} path="" />
      </Routes>
    </Router>
  );
}

export default App;
