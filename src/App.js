import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Home from './pages/index';
import SignInVet from './components/SignInVet/index'
import SignInClient from './components/SignInClient/index'
import Navbar from './components/ClientPage/Navbar';
import ClientProfile from './components/ClientPage/Profile';
import ClientMyPets from './components/ClientPage/MyPets';
import ClientConsult from './components/ClientPage/Consult';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home/>} exact />
          <Route path="/signinvet" element={<SignInVet/>} exact />
          <Route path="/signinclient" element={<SignInClient/>} exact/>
          <Route path='/Client/Profile' element={<ClientProfile/>} />
          <Route path='/Client/MyPets' element={<ClientMyPets/>} />
          <Route path='/Client/Consult' element={<ClientConsult/>} />
      </Routes>
      
      
      
    </Router>
  );
}

export default App;
