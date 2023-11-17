import React from 'react'
import { useState,useEffect } from 'react';
import { json, useNavigate,Link } from "react-router-dom"

const Signup = () => {
    const navigate = useNavigate();
    const auth = localStorage.getItem('users');
    useEffect(() => {
        if (auth) {
            navigate('/');
        }
    })
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const handleFormData = (e) => {
        const name = e.target.name
        const value = e.target.value
        // console.log(name,value)
        setFormData({ ...formData, [name]: value })
    }
    
    const collectFormData = async () => {

        const { username, email, password } = formData;
        let signupApi = await fetch('http://localhost:5000/ecom/users/register', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: {
                'Content-Type': "application/json"
            }
        })
        let result = await signupApi.json()
        console.log(result);
        if (result) {
            // localStorage.setItem("users", JSON.stringify(result))
            alert('User Registered Successfully!')
            navigate('/loginuser')
        }
    }

    return (
        <>
        <h1 className='text-8xl mt-5 font-extrabold text-center signup bg-gradient-to-b from-green-600 to-green-400 bg-clip-text text-transparent pb-4'>Signup</h1>
        <div className='animate-pulse w-80 m-auto mt-10 bg-[#3139394d] p-6 rounded shadow-[#000000fe] shadow-md'>
            <form onSubmit={(e) => { e.preventDefault() }} className='flex justify-center flex-col gap-3'>
                <label className='text-lg font-semibold text-green-600'>Username:</label>
                <input type="text" placeholder='Enter username...' className='rounded text-white shadow-md shadow-black text-lg bg-[#343737] p-2 outline-none' name="username" value={formData.username} onChange={handleFormData} required />
                <label className='text-lg font-semibold text-green-600'>Email:</label>
                <input type="email" placeholder='Enter email...' className='rounded text-lg bg-[#343737] p-2 outline-none  text-white shadow-md shadow-black ' name="email" required value={formData.email} onChange={handleFormData} />
                <label className='text-lg font-semibold text-green-600'>Password:</label>
                <input type="password" placeholder='Enter password...' className='rounded text-lg bg-[#343737] p-2 outline-none  text-white shadow-md shadow-black ' name="password" required value={formData.password} onChange={handleFormData} />
              
                    <button type="submit" onClick={collectFormData} className=' p-2 text-xl bg-gradient-to-r from-green-600 to-green-400 font-mono font-semibold rounded hover:bg-gradient-to-r hover:from-green-300 hover:to-green-600'>Signup</button>
                    <Link to="/loginuser" className='flex justify-center text-green-600 text-xl hover:text-green-300'>Login</Link>
            </form>
        </div>
        </>
    )
}

export default Signup