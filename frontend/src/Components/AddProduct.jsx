import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom"

const AddProduct = () => {
    const navigate = useNavigate();
    const userId = JSON.parse(localStorage.getItem('users'))._id;
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        company: ""
    });
    const handleFormData = (e) => {
        const name = e.target.name
        const value = e.target.value
        // console.log(name,value)
        setFormData({ ...formData, [name]: value })
    }

    const addProduct = async () => {

        const { name, price, category,company } = formData;

        let products = await fetch('http://localhost:5000/ecom/products/add', {
            method: 'POST',
            body: JSON.stringify({ name, price, category, company,userId }),
            headers: {
                'Content-Type': "application/json",
                Authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
            }
        })
        let result = await products.json()
        console.log(result);
        if (result) {
            // localStorage.setItem("users", JSON.stringify(result))
            alert('Product Added Successfully!')
            navigate('/')
        }
        console.log(name,price,category,company,userId);
    }

    return (
        <>
            <h1 className='text-8xl mt-5 font-extrabold text-center signup bg-gradient-to-b from-green-600 to-green-400 bg-clip-text text-transparent pb-4'>ADD PRODUCTS</h1>
            <div className='animate-pulse w-80 m-auto mt-2 bg-[#3139394d] p-6 rounded shadow-[#000000fe] shadow-md'>
                <form onSubmit={(e) => { e.preventDefault() }} className='flex justify-center flex-col gap-3'>
                    <label className='text-lg font-semibold text-green-600'>Enter name:</label>
                    <input type="text" placeholder='Enter product name...' className='rounded text-white shadow-md shadow-black text-lg bg-[#343737] p-2 outline-none' name="name" value={formData.name} onChange={handleFormData} required />
                    <label className='text-lg font-semibold text-green-600'>Enter price:</label>
                    <input type="text" placeholder='Enter product price...' className='rounded text-lg bg-[#343737] p-2 outline-none  text-white shadow-md shadow-black ' name="price" required value={formData.price} onChange={handleFormData} />
                    <label className='text-lg font-semibold text-green-600'>Enter product category:</label>
                    <input type="text" placeholder='Enter product category...' className='rounded text-lg bg-[#343737] p-2 outline-none  text-white shadow-md shadow-black ' name="category" required value={formData.category} onChange={handleFormData} />
                    <label className='text-lg font-semibold text-green-600'>Enter product company:</label>
                    <input type="text" placeholder='Enter product company...' className='rounded text-lg bg-[#343737] p-2 outline-none  text-white shadow-md shadow-black ' name="company" required value={formData.company} onChange={handleFormData} />

                    <button type="submit" onClick={addProduct} className=' p-2 text-xl bg-gradient-to-r from-green-600 to-green-400 font-mono font-semibold rounded hover:bg-gradient-to-r hover:from-green-300 hover:to-green-600'>ADD</button>
                </form>
            </div>
        </>
    )
}

export default AddProduct