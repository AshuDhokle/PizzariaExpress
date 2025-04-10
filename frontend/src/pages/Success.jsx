import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { selectCart } from '../features/cart/cartSlice';
import { Button } from '@mui/material';

const Success = () => {
  const navigate = useNavigate();
  const handleClick = () =>{
        
    navigate('/');
  }
    
  return (
    <div className='p-10 h-[595px] flex flex-col items-center justify-center'>
        <h1 className='text-5xl m-2 font-nunito font-bold'>Payment Done!</h1>
        <Button onClick={handleClick} >Order More</Button>
    </div>
  )
}

export default Success