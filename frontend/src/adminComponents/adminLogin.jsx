import Axios from 'axios';
import React, { useState,useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {loginAdmin,selectAdmin} from '../features/admin/adminSlice'
const AdminLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [admin,setAdmin] = useState({
        id:"",
        password:"",
    })
    const [message,setMessage] = useState('');
    const logedAdmin = useSelector(selectAdmin)

    useEffect(()=>{
        if(logedAdmin){
            navigate('/admin/adminPanel')
        }
    },[])

    const handleChange = (e) => {
        setAdmin((a)=>({...a,[e.target.name]:e.target.value}))
    }
    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
            const response = await Axios.post('http://localhost:3000/api/admin/auth/login',admin);
            if(response.status === 200){
                dispatch(loginAdmin(response.data))
                setMessage('')
                navigate('/adminPanel') 
            }
        } catch (error) {
           if(parseInt(error.response.status) === 401){
            setMessage('Wrong Password !!!')
           }   
        }

    }
    
    return (
        <div className="m-4 rounded-xl min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
          <h1 className='text-xl text-white font-semibold px-4 py-2 bg-gradient-to-r from-green-500 to-sky-400 rounded-xl shadow-xl'>Admin Login</h1>  
          <p className='text-sm text-red-500'>{message}</p>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm -space-y-px">
                 <div>
                 <label htmlFor="id" className="sr-only">Admin Id </label>
                 <input id="id" name="id" type="text" value={admin.id} required 
                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                 placeholder="Admin Id" onChange={handleChange}  />
                 </div>
                <div>
                 <label htmlFor="password" className="sr-only">Password</label>
                 <input id="password"  name="password"  type="password" value={admin.password}  autoComplete="current-password"  required  
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"  
                      placeholder="Password" onChange={handleChange}
                 />
                </div>
                
               </div>

               <div>
                <button type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Sign in
                </button>
               </div>
              </form>
          
           
            </div>
        </div>
    );
};

export default AdminLogin;
