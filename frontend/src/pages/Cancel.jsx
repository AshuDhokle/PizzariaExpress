import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';

const Cancel = () => {
  const navigate = useNavigate();
  const handleClick = () =>{
    navigate('/menu');
  }

  return (
    <div className='p-10 h-[595px] flex flex-col items-center justify-center'>
        <h1 className='text-5xl m-2'>Session Over !</h1>
        <p className='text-2xl m-2 text-red-600 font-nunito font-bold'>Payment Failed !</p>
        <Button onClick={handleClick} >Go To Menu</Button>
    </div>
  )
}

export default Cancel