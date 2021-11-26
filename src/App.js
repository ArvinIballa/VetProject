import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Home from './pages/index';
import SignInVet from './components/SignInVet/index'
import SignInClient from './components/SignInClient/index'
import NavbarClient from './components/ClientPage/Navbar';
import NavbarVet from './components/VetPage/Navbar';
import ClientProfile from './components/ClientPage/Profile';
import ClientMyPets from './components/ClientPage/MyPets';
import ClientConsult from './components/ClientPage/Consult';
import VetProfile from './components/VetPage/profile';
import VetBooking from './components/VetPage/booking';
import VetPatient from './components/VetPage/patients';
import VetCalendar from './components/VetPage/calendar';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const isClient = sessionStorage.getItem('isClient')
  console.log(isClient)
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home/>} exact />
          <Route path="/signinvet" element={<SignInVet/>} exact />
          <Route path="/signinclient" element={<SignInClient/>} exact/>
          <Route path='/Client/Profile' element={<ClientProfile/>} />
          <Route path='/Client/MyPets' element={<ClientMyPets/>} />
          <Route path='/Client/Consult' element={<ClientConsult/>} />
          <Route path='/Vet/Profile' element={<VetProfile/>} />
          <Route path='/Vet/Calendar' element={<VetCalendar/>} />
          <Route path='/Vet/Patients' element={<VetPatient/>} />
          <Route path='/Vet/Bookings' element={<VetBooking/>} />
      </Routes>
      
      
      
    </Router>
  );
}

export default App;
