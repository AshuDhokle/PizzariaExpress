import React, { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { selectAdmin,logoutAdmin} from '../features/admin/adminSlice'
import {Link, Routes,Route, useNavigate} from 'react-router-dom'
import AddPizza from './addPizza'
import PizzaList from './pizzaList'
import OrderList from './orderList'
import UserList from './userList'
import EditPizza from './editPizza'
import AdminLogin from './adminLogin'

const Admin = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () =>{
    dispatch(logoutAdmin());
    navigate('/admin/adminLogin')
  } 
  
  const admin = useSelector(selectAdmin);
  useEffect(()=>{
    if(!admin){
      navigate('/admin/adminLogin')
    }
  },[])
  return (
    <div>
      
    </div>
  )
}

export default Admin