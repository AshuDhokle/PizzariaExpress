import React,{useEffect, useState,useRef} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {useDispatch ,useSelector} from 'react-redux'
import { logout,selectUser } from '../features/user/userSlice'
import { selectCart } from '../features/cart/cartSlice'
import { FaRegCircleUser } from "react-icons/fa6";
import { Transition } from '@headlessui/react';
const Navbar = () => {
  
  const navigate = useNavigate();
  let menuRef = useRef();

  const user = useSelector(selectUser);
  //console.log(user);
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate('/user/home')
    setIsOpen(!isOpen)
  };
  
  useEffect(()=>{
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setIsOpen(false);
      
      }
    }
    document.addEventListener("mousedown",handler);
  })

  const [isOpen,setIsOpen] = useState(false);

  return (
    <div className='p-2 px-6 w-full bg-white text-black shadow-2xl flex flex-row items-center justify-between sticky top-0 z-20' >
        <div className='flex flex-row items-center justify-center'>
            <Link to='/'><h1 className='text-xl font-nunito m-2 mr-8 text-red-500'>Amba Nagri </h1></Link>
            <Link className='text-lg font-nunito m-2 text-blue-600' to = "/user/home">Home</Link>
        </div>
        <div className='flex flex-row items-center justify-center'>
            {
              user 
                ?
                <div className='flex flex-col z-10' ref={menuRef}  >
                  <FaRegCircleUser className='m-2 size-8' onClick={()=>{setIsOpen(!isOpen)}} />
                  { 
                    <Transition
                    show={isOpen}
                    enter="transition-opacity duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                    <div  className='z-20 w-32 bg-white p-4 rounded-xl absolute top-20 right-10 text-black shadow-xl'>
                      <ul>
                        <li>
                          <h1 className='m-2'>{user.name}</h1>
                          <hr className=''/>
                          <h1 className='m-2'>Profile</h1>
                          <Link to='/user/orders' className='m-2'>Orders</Link>
                          <button className='m-2 text-red-500' onClick={handleLogout}>Logout</button>
                        </li>
                      </ul>
                    </div>
                  </Transition>
                  }
                </div>
                :
                <Link to='/user/login' className=' m-2 p-2' >Login</Link> 
            }
                <Link to='/user/cart' className=' m-2 p-2 text-blue-600' >Cart {cart.length}</Link>       
           
          
        </div>
    
    </div>
  )
}

export default Navbar