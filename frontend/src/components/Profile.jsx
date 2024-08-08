import React, { useState } from 'react'
import Navbar from './Navbar'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/user/userSlice'
import Orders from "./Orders"
import { Box, Typography,Tab,Tabs,Button } from '@mui/material'
import AddAddress from './AddAddress'
const Profile = () => {
  const user = useSelector(selectUser)
  return (
    <div className=''>
       
       <div className='p-2' style={{backgroundColor:'#FF8F00'}}>
       <UserProfile user={user}/>
       <OtherDetails user={user}/>
       </div>
       
       {/* <Orders/> */}
    </div>
  )
}

const UserProfile = ({user}) =>{
 return(
    <Box sx={{mt:10, mx:10}}>
       <Typography variant='h4' sx={{mx:2,color:'white',fontFamily:'cursive', fontWeight:600 }} >{user.name}</Typography>     
       <div className='flex flex-row'>
        <Typography sx={{mx:2,color:'white',fontFamily:'cursive'}} >{user.email}</Typography>
        <Typography sx={{mx:2,color:'white',fontFamily:'cursive'}} >{user.phone}</Typography>
       </div>

    </Box>
 )
}

const OtherDetails = ({user}) => {
    
    const [currentTab,setCurrentTab] = useState(0);

    return(
        <Box sx={{m:5,p:5,backgroundColor:'white'}}>
           <Box sx={{ borderBottom: 1 }}>
            <Tabs  aria-label="basic tabs example">
             <Tab sx={{backgroundColor:currentTab === 0 ? '#FF4C4C' : ''}} label="Orders" onClick={()=>setCurrentTab(0)} />
             <Tab sx={{backgroundColor:currentTab === 1 ? '#FF4C4C' : ''}} label="Addresses" onClick={()=>setCurrentTab(1)} />
            </Tabs>
           </Box>
           <Orders currentTab ={currentTab} index={0}/>
           <Addresses currentTab ={currentTab} index={1} user={user}/>
        </Box>
    )
}

const Addresses = ({currentTab,index,user}) =>{
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

export default Profile