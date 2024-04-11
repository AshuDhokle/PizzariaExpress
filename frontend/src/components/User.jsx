import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import Orders from './Orders'
import Cart from './Cart'
import Navbar from './Navbar'
const User = () => {
  return (
    <div>
        <Navbar/> 
        <Routes>
         <Route path='home' element={<Home/>}/>
         <Route path='login' element={<Login/>}/>
         <Route path='signup' element={<Signup/>}/>
         <Route path='orders' element={<Orders/>}/>
         <Route path='cart' element={<Cart/>}/>
        </Routes>
    </div>
  )
}

export default User