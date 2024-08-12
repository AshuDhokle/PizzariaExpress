
import React, {useState} from 'react'
import { Box } from '@mui/system';
import { Slide } from '@mui/material';
import { FaArrowLeft } from 'react-icons/fa6';
import { FaArrowRight } from 'react-icons/fa6';
import CouponCard from '../CouponCard';
import { couponCodes } from '../../utils/coupon';


export const Coupon = () =>{
    const [slideIn, setSlideIn] = useState(true);
    const [slideDirection, setSlideDirection] = useState();
    const [index, setIndex] = useState(0);
    const numSlides = couponCodes.length; 
    
    const handleClick = (direction) => {
      const increment = direction === "left" ? -1 : 1;
      const newIndex = (index + increment + numSlides) % numSlides;
      const oppDirection = direction === "left" ? "right" : "left";
      setSlideDirection(direction);
      setSlideIn(false);
  
      setTimeout(() => {
        setIndex(newIndex);
        setSlideDirection(oppDirection);
        setSlideIn(true);
      }, 500);
    };
    return(
      <Box sx={{p:2, display:'flex',flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
        <FaArrowLeft className='size-6 mx-2 text-white' onClick={() => handleClick("right")} />
          <Slide in={slideIn} direction={slideDirection}>
            <Box sx={{p:4,width:1,backgroundColor:'#B60071',borderRadius:2,boxShadow:'40px'}}>
             <CouponCard content = {couponCodes[index]}/>
            </Box>
          </Slide>
          <FaArrowRight className='size-6 mx-2 text-white' onClick={() => handleClick("left")}/>
      </Box>
    )
  }