import './App.css';
import QuestionPage from './pages/HomePage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<QuestionPage/>} path="" />
      </Routes>
    </Router>
  );
}

export default App;
