import React from 'react'
import AppointmentForm from "../components/AppointmentForm"
import Hero from '../components/Hero'
const Appointment = () => {
  return (
    <>
    <Hero title={"Book your appointment now | Curamed Hospital management "} imageUrl={"/images/about.png"}/>
    <AppointmentForm/>
      
    </>
  )
}

export default Appointment
