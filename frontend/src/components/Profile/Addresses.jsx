import React from 'react'
import { Box} from '@mui/material'
import AddAddress from '../AddAddress/AddAddress'
export const Addresses = ({currentTab,index,user}) =>{
    return(
          <>
          {
            currentTab === index 
            && <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-2'>
            {
              user.addresses.map((address,idx)=>(
                <Box key={idx} sx={{p:2,border:1,m:2,borderColor:'gray',borderRadius:2}}>
                  <h1 className=' font-semibold '>{address.cat}</h1>
                  <h1>{address.address}</h1>
                </Box>
              ))                    
            }
            <AddAddress/>
            </div>
          } 
          </>  
      )
  }