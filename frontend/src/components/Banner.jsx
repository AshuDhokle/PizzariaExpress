import React,{useState,useEffect} from 'react'
import { Box,Typography,Button, Stack } from '@mui/material';
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Banner = ({use,contents}) => {
   const navigate = useNavigate();
  
  return (
  <Stack direction={'row'} sx={{width:1,height:500 ,justifyContent:'space-around',backgroundColor:'#E4003A'}}>
    <Box sx={{p:2, mt:20  }}>
      <Typography variant='h3' sx={{my:2,color:'#FFB200', lineHeight:1}}>We Make 'Em <br/> Fresh & Hot Just For You</Typography>
      <Typography variant='h6' sx={{my:1,color:'orange'}} >The Fastest Pizza Delivery in Town</Typography>    
      <Button onClick={()=>navigate('/menu')} sx={{color:'white',backgroundColor:'#FFB200', borderRadius:2, ":hover":{backgroundColor:'#EB5B00'}}}>Get Started <span><FaChevronRight /></span></Button>
    </Box>
    <Box sx={{width:300,height:300,mt:10, borderRadius:3}}>
      <img src='images/pizzaBanner.png' alt='pizzaBanner'/>
    </Box> 
  </Stack> 
       
  )
}

export default Banner