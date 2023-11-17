import React, { useEffect } from 'react'
import { useState} from 'react';
import { useNavigate,Link } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('users');
        if(auth){
            navigate('/')
        }
    })
    const [formData, setFormData] = useState({
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
        const {email, password } = formData;
        // console.log(email,'-----',password)
        let loginApi = await fetch('http://localhost:5000/ecom/users/loginuser', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': "application/json"
            }
        })
        let result = await loginApi.json()
        
        if(!result.auth)
        {
            alert('Please enter correct details')
        }
        else{
            localStorage.setItem('users',JSON.stringify(result.user))
            localStorage.setItem('token',JSON.stringify(result.auth))
            // console.log(result)
            navigate('/')
        }
    }

    return (
        <>
        <h1 className='text-8xl mt-5 font-extrabold text-center login bg-gradient-to-b from-green-600 to-green-400 bg-clip-text text-transparent pb-4'>Login</h1>
        <div className={`animate-pulse w-80 m-auto mt-16 bg-[#3139394d] p-6 rounded shadow-[#000000fe] shadow-md`}>
            <form onSubmit={(e) => { e.preventDefault() }} className='flex justify-center flex-col gap-3'>
                <label className='text-lg font-semibold text-green-600'>Email:</label>
                <input type="email" placeholder='Enter email...' className='rounded text-lg bg-[#343737] p-2 outline-none  text-white shadow-md shadow-black ' name="email" required value={formData.email} onChange={handleFormData} />
                <label className='text-lg font-semibold text-green-600'>Password:</label>
                <input type="password" placeholder='Enter password...' className='rounded text-lg bg-[#343737] p-2 outline-none  text-white shadow-md shadow-black ' name="password" required value={formData.password} onChange={handleFormData} />
              
                    <button type="submit" onClick={collectFormData} className=' p-2 text-xl bg-gradient-to-r from-green-600 to-green-400 font-mono font-semibold rounded hover:bg-gradient-to-r hover:from-green-300 hover:to-green-600'>Login</button>
                    <Link to='/signup' className='flex justify-center text-green-600 text-xl hover:text-green-300'>Signup</Link>
            </form>
        </div>
        </>
    )
}

export default Login