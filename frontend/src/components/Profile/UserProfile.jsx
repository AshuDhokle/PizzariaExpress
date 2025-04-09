import React from 'react'
import { Box, Typography} from '@mui/material'

export const UserProfile = ({user}) =>{
    return(
       <Box sx={{p:5 ,mx:10}}>
          <Typography variant='h4' sx={{mx:2,color:'white',fontFamily:'cursive', fontWeight:600 }} >{user.name}</Typography>     
          <div className='flex flex-row'>
           <Typography sx={{mx:2,color:'white',fontFamily:'cursive'}} >{user.email}</Typography>
           <Typography sx={{mx:2,color:'white',fontFamily:'cursive'}} >{user.phone}</Typography>
          </div>
   
       </Box>
    )
   }