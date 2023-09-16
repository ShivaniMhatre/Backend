import React, { useContext } from 'react'
import '../Common/Navbar.css'
import { UserContext } from '../../Context/UserContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const { state, dispatch } = useContext(UserContext)
    // console.log(state,"nav_8");
    const route = useNavigate();
    const logout=()=>{
        localStorage.removeItem('token')
        dispatch({
            type:"LOGOUT"
        })
        route('/')
    }

    

    return (
        <div>
            <div id="navbar">
                <div id='left'>
                    <div id='logo'>
                        <h1>LOGO</h1>
                    </div>
                    <div id='nav'>
                        {state?.user?.role != "Seller" && <h4>Mens</h4>}
                        {state?.user?.role != "Seller" && <h4>Women</h4>}
                        {state?.user?.role != "Seller" && <h4>Kids</h4>}
                        {/* seller */}
                        {state?.user?.role == "Seller" && <h4 onClick={() => route("/add_product")}>Add Product</h4>}
                        {state?.user?.role == "Seller" && <h4 onClick={() => route("/your-products")}>Your Products</h4>}
                    </div>
                </div>
                <div id='right'>
                    {state?.user?.name ?
                        <>
                            {state?.user?.role == "Buyer" && <h4>Cart</h4>}

                            <h4 onClick={()=>route('/profile')}>Profile</h4>
                            {/* <h4 onClick={()=>dispatch({type:"LOGOUT"})}>Logout</h4> */}
                            <h4 onClick={logout}>Logout</h4>
                        </> :
                        <h4 onClick={() => route('/login')}>SignIn/SignUp</h4>}
                </div>
            </div>
        </div>
    )
}

export default Navbar