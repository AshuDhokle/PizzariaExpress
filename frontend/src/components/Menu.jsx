import React, { useEffect, useState } from 'react'
import Cards from './Cards'

import ReactLoading from 'react-loading';
import { useSelector } from 'react-redux';
import {selectPizzas} from '../features/pizzas/pizzaSlice'
import Navbar from './Navbar';
import { Box, Stack } from '@mui/system';
import { Button, ListItem,List,useMediaQuery, Divider, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import menu from '../utils/menu';
const Menu = () => {
 
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack direction='column'>
      <Navbar/>
      <Stack direction='column' sx={{display:'flex',flexDirection:'column',alignItems:'center', justifyContent:'center'}}>
       <Box sx={{m:2,p:4,width:'600px', height:'200px',borderRadius:3, backgroundColor:'#FF6500',alignSelf:'start', display:'flex'}}>
       <Box>
       <Typography sx={{color:'#FFC100',fontWeight:600,fontSize:30,lineHeight:2.2}}>Amba Nagri Pizza</Typography>
       <Typography sx={{color:'white'}}>
        India’s Highest Rated Pizza Delivery Chain <br/> Known for Pizzas with 2X Toppings.
       </Typography>
       </Box>
       <Box>
        {/* Coupon Code */}
       </Box>
       </Box>
       <Stack direction='row' sx={{p:5}}>
        <Box sx={{mt:1,width:'300px',height:'fit-content',p:2,borderRadius:3, mr:2 ,display:isSmallScreen?'none':'inline',position:'sticky',top:100}}>
          <List>
            {menu.map((item)=>(
             <ListItem sx={{m:-1}} key={item.id}>
              <Button sx={{width:'300px',display:'felx', flexDirection:'row', alignItems:'center',justifyContent:'start'}}>
               <img src={item.image} alt={item.id} className='size-14 mx-2 rounded-full'/>
               <p> {item.name} </p>
              </Button>
             </ListItem>
            ))}
          </List>
        </Box>
        <Divider sx={{width:10,color:'black'}}/>
        <Food/>
       </Stack>
      </Stack>
    </Stack>
  );
}

export default Menu;


const Food = () =>{

  let pizzaList = useSelector(selectPizzas).pizzas;
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    setPizzas(pizzaList);
   setLoading(false);
   
  },[pizzaList])

  // Calculate the indexes for pagination   
  

  return(
    <div className='px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border-l-2 border-gray-300'>
        {loading ? (
          <ReactLoading type='spin' color='blue' height={100} width={100} />
        ) : pizzaList.length > 0 ? (
          pizzaList.map((pizza, idx) => <Cards key={idx} pizza={pizza} />)
        ) : (
          <h1 className='flex flex-col items-start justify-center'>No pizzas found</h1>
        )}
    </div>
  )
}