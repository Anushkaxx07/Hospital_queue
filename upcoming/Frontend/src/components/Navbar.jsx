import React, { useContext, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { Context } from '../main';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
    const[show,setShow]=useState(false);
    const{isAuthenticated,setIsAuthenticated}=useContext(Context);
    const navigateTo=useNavigate()
    const handlerLogout=async()=>{
            await axios.get("",
                {withCredentials:true,

                })
                .then((res)=>{
                toast.success(res.data.message);
                setIsAuthenticated(false);
            })
            .catch((err)=>{
                toast.error(err.response.data.message);
            });
        

    };
    const gotoLogin=()=>{
        navigateTo("/login");
        

    };
  return (
    <nav className='container'>
        <div className='logo'>
            <img src="./images/logo.png" alt="logo" style={{borderRadius:'999rem',height:150,width:150}}/>
        </div>
        <div className={show?"navLinks showmenu":"navLinks"}>
            <div className="links">
                <Link to={"/"}>HOME</Link>
                <Link to={"/appointment"}>APPOINTMENT</Link>
                <Link to={"/about"}>ABOUT US</Link>
            </div>
            {isAuthenticated?(
                <button className='logoutBtn btn' onClick={handlerLogout}>
                    LOGOUT
                </button>
        ):(
        <button className='logoutBtn btn' onClick={gotoLogin}>
            LOGIN
        </button>)}


        </div>

    </nav>
  )
}

export default Navbar
