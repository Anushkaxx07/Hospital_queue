import React, { useContext, useState } from 'react'
import { Context } from '../main';
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Regi = () => {
     const{isAuthenticated,setIsAuthenticated}=useContext(Context);
     const[firstName,setFirstName]=useState("");
     const[lastName,setLastName]=useState("");
     const[email,setemail]=useState("");
     const[phone,setPhone]=useState("");
     const[nic,setNic]=useState("");
     const[dob,setDob]=useState("");
     const[gender,setGender]=useState("");
     const[password,setPassword]=useState("");
     

     const navigateTo=useNavigate();

     const handleRegister=async(e)=>{
        e.preventDefault();
        try {
         const response=await axios
         .post(
             "http://localhost:4000/api/v1/user/patient/register",
             {firstName,lastName,email,phone,nic,dob,gender,password,role:"Patient"},
             {
               withCredentials: true,
               headers:{"Content-Type":"application/json"},
             }
         );
         toast.success(response.data.message);
         setIsAuthenticated(true);
         setFirstName("");
         setLastName("");
         setemail("");
         setPhone("");
         setNic("");
         setDob("");
         setGender("");
         setPassword("");
         navigateTo("/");
     } catch (error) {
         toast.error(error.response.data.message);
         
     }

 };
 if (isAuthenticated) {
   return <Navigate to={"/"} />;
 }
 

  return (
    <div className='container form-component register-form'>
        <h2>Sign Up</h2>
        <p>Please Sign Up to continue</p>
        <form onSubmit={handleRegister}>
         <div>
         <input type="text" 
         placeholder='First Name' 
         value={firstName} 
         onChange={(e)=>setFirstName(e.target.value)}/>
         <input type="text"
          placeholder='Last Name' 
          value={lastName} 
          onChange={(e)=>setLastName(e.target.value)}/>
         </div>         
         <div>
         <input type="text" placeholder='Email' value={email} onChange={(e)=>setemail(e.target.value)}/>
         <input type="number" placeholder='Phone Number' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
         </div>
         <div>
         <input type="number" placeholder='Nic' value={nic} onChange={(e)=>setNic(e.target.value)}/>
         <input type="date" placeholder='Date of Birth' value={dob} onChange={(e)=>setDob(e.target.value)}/>
         </div>  
         <div>
            <select value={gender} onChange={(e)=>setGender(e.target.value)}>
               <option value="">Select Gender</option>
               <option value="Male">Male</option>
               <option value="Female">Female</option>
               <option value="Other">Other</option>
               
            </select>
         <input type="password" 
         placeholder='Password'
          value={password} 
          onChange={(e)=>setPassword(e.target.value)}/>
        
         </div>  
         <div style={{
            gap:"10px",
            justifyContent:"flex-end",
            flexDirection:"row"
            }}>
        <p style={{marginBottom: 0}}>Already Registered</p>
        <Link
         to={"/login"} 
         style={{textDecoration:"none",color:"#271776ca"}}>
            Login Now
            </Link>
    </div>
    <div style={{justifyContent:"center",alignItems:"center"}}>
        <button type='submit'>Register</button>

    </div>

</form>
        
</div>
  );
};

export default Regi;
