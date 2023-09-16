import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import api from '../Appconfig'

const Register = () => {
    const [userData, setUserData] = useState({ name: "", email: "", password: "", confirmPassword: "", role: "Buyer", number: "" })
    const { state } = useContext(UserContext);

    const route = useNavigate()

    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }
    const handleChangeForSelect = (event) => {
        setUserData({ ...userData, "role": event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (userData.name && userData.email && userData.password && userData.confirmPassword && userData.role && userData.number) {
            if (userData.password === userData.confirmPassword) {
                const response = await api.post("/register", { userData });
                if (response.data.success) {
                    setUserData({ name: "", email: "", password: "", confirmPassword: "", role: "Buyer", number: "" })
                    route('/login')
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }

            } else {
                toast.error("Password and Confirm Password not Matched.")
            }
        } else {
            toast.error("All fields are mandtory.")
        }
    }
    useEffect(() => {
        if (state?.user?.name) {
            route('/')
        }
    }, [state])

    // console.log(userData, "userData")

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>Name</label><br />
                <input type='text' onChange={handleChange} name='name' value={userData.name} /><br />
                <label>Email</label><br />
                <input type='email' onChange={handleChange} name='email' value={userData.email} /><br />
                <label>Number</label><br />
                <input type='number' onChange={handleChange} name='number' value={userData.number} /><br />
                <label>Role</label><br />
                <select onChange={handleChangeForSelect} name='role'>
                    <option value="Buyer">Buyer</option>
                    <option value="Seller">Seller</option>
                </select><br />
                <label>Password</label><br />
                <input type='password' onChange={handleChange} name='password' value={userData.password} /><br />
                <label>Confirm Password</label><br />
                <input type='password' onChange={handleChange} name='confirmPassword' value={userData.confirmPassword} /><br />
                <input type='submit' value='Register' /><br />
            </form>
            <button onClick={() => route('/login')}>Login</button>
        </div>
    )
}

export default Register
