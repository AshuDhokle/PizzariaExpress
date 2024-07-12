import React,{useEffect, useState,useRef} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {useDispatch ,useSelector} from 'react-redux'
import { logout,selectUser } from '../features/user/userSlice'

import { FaRegCircleUser } from "react-icons/fa6";
import { Transition } from '@headlessui/react';
import CartDrawer from './cartDrawer'
import { Button,Menu,MenuItem } from '@mui/material';
const Navbar = () => {
  
  const navigate = useNavigate();
  let menuRef = useRef();

  const user = useSelector(selectUser);
  //console.log(user);
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate('/user/home')
    setIsOpen(!isOpen)
  };
  
  // useEffect(()=>{
  //   let handler = (e)=>{
  //     if(!menuRef.current.contains(e.target)){
  //       setIsOpen(false);
  //     }
  //   }
  //   document.addEventListener("mousedown",handler);
  // })

  const [isOpen,setIsOpen] = useState(false);

  return (
    <div className='py-2 px-6 w-full bg-white text-black border-b-2 flex flex-row items-center justify-between sticky top-0 z-20 ' >
        <div className='flex flex-row items-center justify-center'>
            <Link to='/'><h1 className='text-xl font-bold m-2 mr-8 ' style={{color:'#FFC100'}}>Amba Nagri </h1></Link>
        </div>
        <div className='flex flex-row items-center justify-center'>  
          <UserMenu/>
          <CartDrawer/>       
        </div>
    
    </div>
  )
}

const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate('/')
  };
  const goToOrders = () =>{
    navigate('/orders')
  }
  const goToProfile = () =>{
    navigate('/profile')
  }
  return(
    <div>
      {
          user ? <div>
            <Button onClick={handleClick}>
              <FaRegCircleUser className='m-2 size-8 text-back'  />
            </Button>
 
            <Menu
             id="basic-menu"
             anchorEl={anchorEl}
             open={open}
             onClose={handleClose}
             MenuListProps={{
             'aria-labelledby': 'basic-button',
            }}>
              <MenuItem onClick={handleClose}><Button onClick={goToProfile}>Profile</Button></MenuItem>
              <MenuItem onClick={handleClose}><Button onClick={goToOrders}>Orders</Button></MenuItem>
              <MenuItem onClick={handleClose}><Button onClick={handleLogout}>Logout</Button></MenuItem>
            </Menu>

          </div>
          : <Link to='/login' className=' m-2 p-2' >Login</Link>
      }
    </div>
  )
}


export default Navbar