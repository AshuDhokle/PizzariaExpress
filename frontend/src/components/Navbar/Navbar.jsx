import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CartDrawer from '../CartDrawer';
import { UserMenu } from './UserMenu';

const Navbar = () => { 
  const location = useLocation();
  const [pageName, setPageName] = useState('');

  useEffect(() => {
    const page = location.pathname.split('/')[1];
    setPageName(page);
  }, [location]);

  return (
    <div className='py-2 px-6 w-full bg-white text-black border-b-2 flex flex-row items-center justify-between sticky top-0 z-20'>
      <div className='flex flex-row items-center justify-center'>
        <Link to='/'><h1 className='text-xl font-bold m-2 mr-8' style={{color:'#FFC100'}}>PizzeriaExpress</h1></Link>
        {
          pageName === 'admin' ? <h1 className='my-2 text-xl font-semibold text-purple-600'>Admin</h1> : <h1 className='my-2 text-xl font-semibold text-purple-600'>User</h1>   
        } 
      </div>
      {pageName === 'admin' ? (
        <div className='flex flex-row items-center'>
          
          <Link to={"/"} className='text-lg m-2'>User</Link>
        </div>
      ) : (
        <div className='flex flex-row items-center justify-center'>
          <UserMenu />
          <CartDrawer />       
          <Link to={"/admin/adminPanel"} className='text-lg m-2'>Admin</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
