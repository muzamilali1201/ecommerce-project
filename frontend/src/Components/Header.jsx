import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Logo from "../assets/logo.png"
const Header = () => {
    const auth = localStorage.getItem('users');
    const navigate = useNavigate();
    // useEffect(()=>{
    //     if(!auth){
    //         navigate('/signup')
    //     }
    // })
    const Logout = () => {
        localStorage.clear();
        navigate('/signup')
    }
    return (
        <div className='m-auto flex justify-between items-center font-mono mt-4 w-[96%] bg-[#3139394d] p-2 rounded'>
            <div className='rounded border border-[#8e8888] text-4xl font-extrabold bg-gradient-to-r from-green-600 to-green-300 text-transparent bg-clip-text shadow-[black] shadow-lg p-1'>E-COMM</div>

            <div className='flex gap-5'>


                {auth ? (
                    <>
                        <div className='text-green-300 text-lg hover:text-green-500'><Link to="/">Home</Link></div>
                        <div className='text-green-300 text-lg hover:text-green-500'><Link to="/add">Add Products</Link></div>
                        <div className='text-green-300 text-lg hover:text-green-500'><Link onClick={Logout} to="/signup">Logout</Link></div>
                        <div className='text-green-300 text-lg hover:text-green-500'><Link to="/profile">Profile</Link></div>
                    </>
                )
                    : (
                        <>
                        <div className='text-green-300 text-lg hover:text-green-500'><Link to="/signup" >Signup</Link></div>
                        <div className='text-green-300 text-lg hover:text-green-500'><Link to="/loginuser" >Login</Link></div>
                        </>
                    )
                }




                {/* <div className='text-green-300 text-lg hover:text-green-500'><Link to="/login">Login</Link></div> */}
            </div>
        </div>
    )
}

export default Header