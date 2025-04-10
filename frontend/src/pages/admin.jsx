import React, { useEffect,useState } from 'react'
import {useSelector} from 'react-redux'
import { selectAdmin} from '../features/admin/adminSlice'
import { useNavigate} from 'react-router-dom'
import AddPizza from '../adminComponents/AddPizza/addPizza'
import PizzaList from '../adminComponents/PizzaList/pizzaList'
import OrderList from '../adminComponents/OrdersList/orderList'
import UserList from '../adminComponents/UserList/userList'
import { Tabs,Tab } from '@mui/material'
const AdminPannel = () => {
  
  const navigate = useNavigate();
  const [value,setValue] = useState(0)
  
  const handleChange = (event,newValue) => {
    setValue(newValue);
    
  }
 
  const admin = useSelector(selectAdmin);
  useEffect(()=>{
    if(!admin){
      navigate('/admin/adminLogin')
    }
  },[])
  return (
    <div className='p-4 h-[610px] overflow-y-scroll'>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
        sx={{display:'flex', flexDirection:'row', backgroundColor:'#1E201E'}}
      >
        <Tab sx={{color:'white'}} label="Pizza List" value={0}/>
        <Tab sx={{color:'white'}} label="Add Pizza" value={1}/>
        <Tab sx={{color:'white'}} label="User List" value={2}/>
        <Tab sx={{color:'white'}} label="Orders List" value={3}/>
      </Tabs>
      
      <PizzaList value={value} idx={0}/>
      <AddPizza value = {value} idx={1}/>
      <UserList value={value} idx={2}/>
      <OrderList value={value} idx={3}/>
    </div>
  )
}

export default AdminPannel