import React, { useContext, useState } from 'react'
import { Context } from '../main'
import { Link, useNavigate } from 'react-router-dom';
import { PiPlaceholder } from 'react-icons/pi';
import { toast } from 'react-toastify';

const Logi = () => {
    const{isAuthenticated,setisAuthenticated}=useContext(Context)
    const[email,setemail]=useState("");
    const[password,setPassword]=useState("");
    const[confirmPassword,setConfirmPassword]=useState("");

    const navigateTo= useNavigate();

    const handleLogin=async(e)=>{
        e.preventDefault();
        try {
            const response=await axios.post("",{email,password,confirmPassword,role:"Patient"},
                {withCredentials: true,
                    headers:{"Content-Type":"application/json"},
                }
            );
            toast.success(response.data.message);
            setisAuthenticated(true);
            navigateTo("/");

        } catch (error) {
            toast.error(error.response.data.message);
            
        }

    };

    if(isAuthenticated){
        return <Navigate to={"/"}/>
    }
  return (
    <div className='container form-component login-form'>
      <h2>Sign In</h2>
      <p>Please Login To Continue</p>
      <p>Welcome to CuraMed – Your Convenient Hospital Booking Solution at Your Doorstep!</p>
    <form onSubmit={ handleLogin}>
    <input type="text" value={email} onChange={(e)=>
        setemail(e.target.value)
    } placeholder='Email'/>
    <input type="password" value={password} onChange={(e)=>
        setPassword(e.target.value)
    } placeholder='Password'/>
    <input type="password" value={confirmPassword} onChange={(e)=>
        setConfirmPassword(e.target.value)
    } placeholder='Confirm Password'/>

    <div style={{gap:"10px",justifyContent:"flex-end",flexDirection:"row"}}>
        <p style={{marginBottom: 0}}>Not Registered</p>
        <Link to={"/register"} stlye={{textDecoration:"none",alignItems:"center"}}>Register Now</Link>
    </div>
    <div style={{justifyContent:"center",alignItems:"center"}}>
        <button type='submit'>Login</button>

    </div>
    
    </form>
    </div>
    
  )
}

export default Logi
