
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from '../src/Component/Home/Home.jsx'
import Login from '../src/Component/SignUp/Login.jsx'
import Register from '../src/Component/SignUp/Register.jsx'
import Navbar from './Component/Common/Navbar';
import AddProduct from './Component/Seller/AddProduct.jsx';
import YourProducts from './Component/Seller/YourProducts.jsx';
import Profile from './Component/SignUp/Profile.jsx';

function App() {
  return (
    <div className='App'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/profile' element={<Profile/>}/> 
        <Route exact path='/add_product' element={<AddProduct />} />
        <Route exact path='/your-products' element={<YourProducts />} />
      </Routes>
    </div>
  );
}

export default App;
