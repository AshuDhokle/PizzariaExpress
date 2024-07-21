import React from 'react'
import { useNavigate } from 'react-router-dom'


const Cancel = () => {
  const navigate = useNavigate();
  const handleClick = () =>{
    navigate('/menu');
  }

  return (
    <div>
        <h1>Session Over !</h1>
        <p>Something went wrong !</p>
        <Button onClick={handleClick} >Go To Menu</Button>
    </div>
  )
}

export default Cancel