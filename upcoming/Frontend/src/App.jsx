import React, { useContext, useEffect } from 'react'
import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Appointment from './pages/Appointment';
import Aboutus from './pages/Aboutus';
import Home from './pages/Home';
import Regi from './pages/Regi';
import Logi from './pages/Logi';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import { Context } from './main';
import axios from 'axios';


const App = () => {
  const{isAuthenticated,setIsAuthenticated,setUser}=useContext(Context);
  useEffect(()=>{
    const fetchUser= async()=>{
      try {
        const response=await axios.get("",{withCredentials: true});
        setIsAuthenticated(true);
        setUser(response.data.user)
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };

  });
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/appointment' element={<Appointmentbooking/>}/>
        <Route path='/about' element={<Aboutus/>}/>
        <Route path='/register' element={<Regi/>}/>
        <Route path='/login' element={<Logi/>}/>

      </Routes>
      <ToastContainer position='top-center'/>
    </Router>
      
    </>
  )
}

export default App
