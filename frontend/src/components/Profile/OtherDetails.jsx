import React, { useState } from 'react'
import Orders from "../Orders/Orders"
import { Box,Tab,Tabs } from '@mui/material'
import { Addresses } from './Addresses'
export const OtherDetails = ({user}) => {
    
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
