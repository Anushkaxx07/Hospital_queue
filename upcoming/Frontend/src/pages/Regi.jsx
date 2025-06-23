import React, { useContext, useState } from 'react'
import { Context } from '../main';
import { useNavigate } from 'react-router-dom';

const Regi = () => {
     const{isAuthenticated,setisAuthenticated}=useContext(Context);
     const[firstName,setFirstName]=useState("");
     const[lastName,setLastName]=useState("");
     const[phone,setPhone]=useState("");
     const[email,setemail]=useState("");
     const[nic,setNic]=useState("");
     const[dob,setDob]=useState("");
     const[gender,setGender]=useState("");
     const[password,setPassword]=useState("");

     const navigateTo=useNavigate();

     const handleRegister=async(e)=>{
        e.preventDefault();

     };
     if(isAuthenticated){
        return <Navigate to={"/"}/>

     }


  return (
    <div className='container form-component register-form'>
        <h2></h2>
        
      
    </div>
  )
}

export default Regi
