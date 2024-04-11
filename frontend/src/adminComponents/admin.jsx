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
      {
        admin 
        ? ( 
          <div>
            <div className='p-2 bg-indigo-400 text-white text-start text-xl flex flex-row justify-between'>
             <div>
             <h1><span className='text-yellow-200 font-semibold'>Admin: </span>{admin.name}</h1>
             <h1><span className='text-yellow-200 font-semibold'>Admin ID :</span> {admin.id}</h1>
             </div>
             <button onClick={handleLogout}className='bg-red-600 px-4 py-2 rounded-xl shadow-xl m-2 text-lg'>Logout</button>
            </div>

            <div className='text-white p-2 bg-violet-800 flex flex-row items-center justify-center'>
             <Link className='m-2' to='/admin/userList'>User List</Link>
             <Link className='m-2' to='/admin/pizzaList'>Pizza List</Link>
             <Link className='m-2' to='/admin/addPizza'>Add Pizza</Link>
             <Link className='m-2' to='/admin/orderList'>Order List</Link>
            </div>
          </div>
      )
      :(
        null
      )
      }

      <Routes>
        <Route path='adminLogin' element={<AdminLogin/>}/>
        <Route path='addPizza' element={<AddPizza />} />
        <Route path='pizzaList' element={<PizzaList />} />
        <Route path='userList' element={<UserList />} />
        <Route path='orderList' element={<OrderList />} />
        <Route path='editPizza/:id' element={<EditPizza/>}/>
      </Routes>
    </div>
  )
}

export default Admin