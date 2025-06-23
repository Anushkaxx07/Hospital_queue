import React, { useContext, useState, useEffect } from 'react';
import {
  Webchat,
  WebchatProvider,
  Fab,
  getClient,
} from '@botpress/webchat';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Aboutus from './pages/Aboutus';
import Home from './pages/Home';
import Footer from './components/Footer';
import Regi from "./pages/Regi";
import Logi from './pages/Logi';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Appointment from './pages/Appointment';
import { Context } from './main';
import axios from 'axios';
import TawkToWidget from './components/TawkToWidget';
import MyAppointments from './components/MyAppointments';


const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/patient/me",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
        console.log("User details: ", response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <TawkToWidget/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/register" element={<Regi />} />
          <Route path="/login" element={<Logi />} />
          <Route path="/myappointments" element={<MyAppointments />} />
        </Routes>
        
        <ToastContainer position="top-center" />
      </Router>

     
    </>
  );
};

export default App;
