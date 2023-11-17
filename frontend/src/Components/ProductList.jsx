import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const ProductList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])
    const getProducts = async () => {
        const products = await fetch('http://localhost:5000/ecom/products/getproducts',{
            headers:{
                Authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
            }
        });
        let result = await products.json();
        setData(result.product);
    }

    const deleteProduct = async (id) => {
        const deleteProd = await fetch(`http://localhost:5000/ecom/products/${id}`, {
            method: 'Delete',
            headers:{
                Authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
            }
        })
        let result = await deleteProd.json();
        if (result) {
            alert('Product is deleted Successfully!');
            getProducts();
        }
    }
    const handleSearch = async (e) => {
        let key = e.target.value
        if(key){

            const search = await fetch(`http://localhost:5000/ecom/products/search/${key}`,{
                headers:{
                    Authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
                }
            })
            let result = await search.json();
            if (result) {
                setData(result)
            }
        }
        else{
            getProducts()
        }
    }

    return (
        <>
            <h1 className='text-8xl mt-5 font-extrabold text-center login bg-gradient-to-b from-green-600 to-green-400 bg-clip-text text-transparent pb-4'>All Products</h1>

            <input className='block m-auto w-[50%] mt-5 mb-5 rounded bg-[#3139394d] p-3 text-white' type="text" placeholder='Search products' onChange={handleSearch} />


            <div className="shadow-md sm:rounded-lg">
                <table className="w-[96%] border-r-2 border-white m-auto text-left text-gray-400">
                    <thead className="text-white font-semibold">
                        <tr className='bg-[#3139394d] p-2  text-xl'>
                            <th scope="col" className="px-6 py-3">
                                S.No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Company
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                             data.map((item, index) => (
                                <tr className='bg-[#3139394d] p-2 rounded text-xl' key={index}>
                                    <th scope="col" className="px-6 py-3">
                                        {index + 1}
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        {item?.name}
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        ${item?.price}
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        {item?.category}
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        {item?.company}
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <button onClick={() => deleteProduct(item?._id)}>❌</button>
                                        <Link to={`/update/${item?._id}`}>🌍</Link>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>

        </>
    )
}

export default ProductList