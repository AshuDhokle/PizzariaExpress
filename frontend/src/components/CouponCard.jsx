import React from 'react'
import {Typography,Card,CardMedia} from '@mui/material';
  
  const CouponCard = ({ content }) => {
    
    return (        
        <>
          <Typography variant="h6" component="p" sx={{color:'white'}}>
            {content.code}
          </Typography>
          <Typography variant="h4" component="p" sx={{color:'#FFB200'}}>
            {content.discount}%
          </Typography>
          <Typography variant="body2" component="p" sx={{color:'white'}}>
            Valid till {new Date(content.expirationDate).toDateString()}
          </Typography>
        </>
      
    );
};

export default CouponCard