import React from 'react'
import {Link} from 'react-router-dom'
import CartDrawer from '../CartDrawer/index'
import { UserMenu } from './UserMenu';
const Navbar = () => { 
  
  return (
    <div className='py-2 px-6 w-full bg-white text-black border-b-2 flex flex-row items-center justify-between sticky top-0 z-20 ' >
        <div className='flex flex-row items-center justify-center'>
            <Link to='/'><h1 className='text-xl font-bold m-2 mr-8 ' style={{color:'#FFC100'}}>PizzeriaExpress </h1></Link>
        </div>
        <div className='flex flex-row items-center justify-center'>  
          <UserMenu/>
          <CartDrawer/>       
        </div>
    
    </div>
  )
}

export default Navbar