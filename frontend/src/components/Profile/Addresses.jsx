import React, { useEffect, useState } from 'react'
import { Box} from '@mui/material'
import AddAddress from '../AddAddress/AddAddress'
import axios from 'axios';
export const Addresses = ({currentTab,index,user}) =>{
    
    const [loading, setLoading] = useState(false);
    const [addresses, setAddresses] = useState([]);
    useEffect(()=>{
      getAddresses();  
    },[user])
    console.log(user._id);
    
    const getAddresses = async()=>{
      setLoading(true);
      try {
        const response = await axios.get(`https://pizzaria-express-six.vercel.app/api/user/update/getAllAddress/?id=${user._id}`)
        const data = await response.data
        setAddresses(data)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    return(
          <div className='flex flex-col items-center justify-center  overflow-y-scroll'>
          {
            currentTab === index 
            && <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-2'>
            {
              addresses.map((address,idx)=>(
                <Box key={idx} sx={{p:2,border:1,m:2,borderColor:'gray',borderRadius:2}}>
                  <h1 className=' font-semibold '>{address.cat}</h1>
                  <h1>{address.address}</h1>
                </Box>
              ))                    
            }
            </div>
          } 
          <AddAddress/>
          </div>  
      )
  }