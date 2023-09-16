import axios from 'axios';
import React, { useEffect, useState } from 'react'
import api from '../Appconfig';

const YourProducts = () => {
    const [allProducts, setAllProducts] = useState();
    useEffect(() => {
        async function getProducts() {
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await api.post("/getyourProduct", { token })
            if (response.data.success) {
                setAllProducts(response.data.products)
            }
        }
        getProducts();
    }, [])
    return (
        <div style={{ width: '90%', margin: 'auto' }}>
            <h1>All Product</h1>
            {allProducts?.length ?
                <div style={{ display: "flex", justifyContent: "space-around", width: '90%', margin: 'auto', marginTop: "20px" }}>
                    {allProducts.map((product) => (
                        <div key={product._id} style={{ width: '26%', height: '300px', boxShadow: '2px 1px blue' }}>
                            <div style={{ width: '80%', height: '150px', margin: 'auto' }}>
                                <img src={product.image} style={{ width: '100%', height: '100%' }} />
                            </div>
                            <h2>Name : {product.name}</h2>
                            <h3>Price : {product.price}</h3>
                        </div>
                    ))}
                </div> : <div>No Products found.</div>}
        </div>
    )
}

export default YourProducts
