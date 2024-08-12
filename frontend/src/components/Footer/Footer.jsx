import React from 'react'
import { Box,Stack, Typography } from '@mui/material'
const Footer = () => {
  return (
    <Stack direction = 'row' sx={{mt:2,p:2,backgroundColor:'black',justifyContent:'center'}}>
      <Box>
        <Typography sx={{color:'white'}}>Pizzeria Express</Typography>
        <Typography sx={{color:'white'}}>@ Copyright 2024</Typography>
      </Box>
    </Stack>
  )
}

export default Footer