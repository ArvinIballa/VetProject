import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Home from './pages/index';
import SignIn from './components/SignIn/index'


function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home/>} exact />
          <Route path="/signin" element={<SignIn/>} exact />
      </Routes>
    </Router>
  );
}

export default App;
