import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import {selectPizzas} from '../../features/pizzas/pizzaSlice'
import { Box, Stack } from '@mui/system';
import { Button, ListItem,List,useMediaQuery, Typography,Slide,Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import menu from '../../utils/menu';
import { useDispatch } from 'react-redux'
import { addPizzas } from '../../features/pizzas/pizzaSlice'
import { Coupon } from './Coupon.';
import { Food } from './Food';
import { MenuToggleButton } from './MenuToggleButton';
const Menu = () => {
  const [category,setCategory] = useState(1);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  
  
  useEffect(()=>{
    
    const getPizzas = async() =>{
      try {
        setLoading(true)
        const response = await axios.get('https://pizzaria-express-six.vercel.app/api/user/pizza');
        if(response){
          dispatch(addPizzas(response.data))
        }
        else {
          throw new Error(response.error);
        }
      } catch (error) {
        console.log(error);
      }finally{
       setLoading(false); 
      }
      
    }
       
    getPizzas(); 
  },[])
  
  let pizzaList = useSelector(selectPizzas).pizzas;
  const [loading, setLoading] = useState(true);
 

  const selectedCategoryFood = pizzaList.filter((item)=>{ return(item.category === category)})
  return (
    <Stack direction='column' sx={{width:1}}>
      <Stack direction='col' sx={{display:'flex',flexDirection:'column',alignItems:'center', justifyContent:'center'}}>
       <Stack direction={'row'} sx={{my:2,width:0.8 ,borderRadius:2, backgroundColor:'#FF6500',alignItems:'center',justifyContent:'space-around'}} >
        <Box sx={{mx:2}}>
         <Typography sx={{color:'#FFC100',fontWeight:600,fontSize:30,lineHeight:2.2}}>Amba Nagri Pizza</Typography>
         <Typography sx={{color:'white'}}>
          India’s Highest Rated Pizza Delivery Chain <br/> Known for Pizzas with 2X Toppings.
         </Typography>
        </Box>
        <Coupon/>
       </Stack>
       <Stack direction={isSmallScreen?'column':'row'} sx={{p:2,width:1}}>
        
        <Box sx={{width:0.16,mt:1,height:'fit-content',p:1,borderRadius:3 ,display:isSmallScreen? 'none' : 'inline',position:'sticky',top:100}}>
          <List>
            {menu.map((item)=>(
             <ListItem sx={{m:-1}} key={item.id}>
              <Button variant={item.id === category ? 'contained' : ''} color='secondary' onClick={()=>setCategory(item.id)} sx={{width:'250px',display:'felx', flexDirection:'row', alignItems:'center',justifyContent:'start'}}>
               <img src={item.image} alt={item.id} className='size-10 mx-2 rounded-full'/>
               <p className='text-xs'> {item.name} </p>
              </Button>
             </ListItem>
            ))}
          </List>
        </Box>
        <Food items = {selectedCategoryFood} loading = {loading} />
        
       </Stack>
      </Stack>
      <MenuToggleButton category={category} setCategory={setCategory}/>
    </Stack>
  );
}

export default Menu;


