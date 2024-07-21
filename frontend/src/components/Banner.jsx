import React,{useState,useEffect} from 'react'
import { Box, Slide, Card,CardMedia,Typography } from '@mui/material';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
const Banner = ({use,contents}) => {
  const [slideIn, setSlideIn] = useState(true);
  const [slideDirection, setSlideDirection] = useState();
  const [index, setIndex] = useState(0);
  const content = contents[index];
  const numSlides = contents.length; 
  
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
  
  const size = use == 'homePage' ? {height:'500px',width:'700px'} : {height:'300px',width:'400px'}   
  return (
    <div>
        <Box sx={{display:'flex', direction:'row', alignItems:'center', justifyContent:'center', p:2}}>
        <FaArrowLeft className='size-6' onClick={() => handleClick("left")} />
          <Slide in={slideIn} direction={slideDirection}>
          <Box sx={{p:4}}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={content.imgSrc} 
              alt={content.title} 
              sx={size}   
            />
          </Card>
        </Box>
            
          </Slide>

        <FaArrowRight className='size-6' onClick={() => handleClick("right")}/>
       </Box>
    </div>
  )
}

export default Banner