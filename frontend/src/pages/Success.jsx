import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { selectCart } from '../features/cart/cartSlice';
import { Button } from '@mui/material';

const Success = () => {
  const navigate = useNavigate();
  const cart = useSelector(selectCart)
  const handleClick = () =>{
        
    navigate('/');
  }
    
  return (
    <div>
        <h1>Payment Done!</h1>
        <Button onClick={handleClick} >Order More</Button>
    </div>
  )
}

export default Success