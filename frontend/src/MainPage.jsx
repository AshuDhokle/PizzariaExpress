import React from 'react';
import { Link,Routes,Route } from 'react-router-dom';

const MainPage = () => {
  return (
    <div className=' h-full'>
    <nav className='p-2 bg-white shadow-xl flex flex-row items-center justify-between'>
        <div className='text-red-400 text-xl font-nunito'>Amba Nagri</div>
        <div>
            <Link to='/user/home' className='m-2'>Home</Link>
            <Link to='/Admin' className='m-2'>Admin</Link>
        </div>
    </nav>
    <div className='m-4 p-4 lg:px-64 grid grid-col-1 md:grid-cols-3  bg-gradient-to-br  from-red-700 from-70%  to-white to-30% text-white' >
      <div className='self-center'>
        <div className=' font-bold text-3xl mb-4'>
          <h1 className=''>The Best Pizza</h1>
          <h1 className=''>In India</h1>
        </div>
        <div className='my-4'>
          <h1 className='mb-4'>Free Delivery for all orders over Rs.400/-</h1>
          <Link to='/user/home' className=' px-4 py-2 bg-yellow-300 rounded-xl shadow-xl text-red-600 font-bold'>Order Now</Link>
        </div>
      </div>
      <div className=' col-span-2'>
        <img src='images/mainPage.png' className=''/>
      </div>
    </div>
    </div>
  );
};

export default MainPage;