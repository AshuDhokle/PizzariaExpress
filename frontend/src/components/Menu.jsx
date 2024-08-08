import React, { useEffect, useState,useRef } from 'react'
import axios from 'axios';
import Cards from './Cards'
import ReactLoading from 'react-loading';
import { useSelector } from 'react-redux';
import {selectPizzas} from '../features/pizzas/pizzaSlice'
import Navbar from './Navbar';
import { Box, Stack } from '@mui/system';
import { Button, ListItem,List,useMediaQuery, Typography,Slide,Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FaArrowLeft } from 'react-icons/fa6';
import { FaArrowRight } from 'react-icons/fa6';
import CouponCard from './CouponCard';
import menu from '../utils/menu';
import { couponCodes } from '../utils/coupon';
import { useDispatch } from 'react-redux'
import { addPizzas } from '../features/pizzas/pizzaSlice'
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { selectUser } from '../features/user/userSlice';
import { addAddresses } from '../features/address/addressSlice';

const Menu = () => {
  const [category,setCategory] = useState(1);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  
  const user = useSelector(selectUser);

  useEffect(()=>{
    
    const getPizzas = async() =>{
      try {
        setLoading(true)
        const response = await axios.get('http://localhost:3000/api/user/pizza');
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

const Coupon = () =>{
  const [slideIn, setSlideIn] = useState(true);
  const [slideDirection, setSlideDirection] = useState();
  const [index, setIndex] = useState(0);
  const numSlides = couponCodes.length; 
  
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
  return(
    <Box sx={{p:2, display:'flex',flexDirection:'row', alignItems:'center',justifyContent:'center'}}>
      <FaArrowLeft className='size-6 mx-2 text-white' onClick={() => handleClick("right")} />
        <Slide in={slideIn} direction={slideDirection}>
          <Box sx={{p:4,width:1,backgroundColor:'#B60071',borderRadius:2,boxShadow:'40px'}}>
           <CouponCard content = {couponCodes[index]}/>
          </Box>
        </Slide>
        <FaArrowRight className='size-6 mx-2 text-white' onClick={() => handleClick("left")}/>
    </Box>
  )
}




const Food = ({items,loading}) =>{
  
  // Calculate the indexes for pagination   
  

  return(
    <div className='px-10 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 border-l-2 border-gray-300 flex-wrap'>
        
        {loading ? (
          <ReactLoading type='spin' color='blue' height={100} width={100} />
        ) : items.length > 0 ? (
          items.map((pizza, idx) => <Cards key={idx} pizza={pizza} />)
        ) : (
          <h1 className='flex flex-col items-start justify-center'>No pizzas found</h1>
        )}

    </div>
  )
}



const MenuToggleButton = ({category,setCategory}) =>{
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open,setOpen] = useState(false);
  const newRef = useRef();
  const anotherRef = useRef();
  const handleClick = (e) =>{
   
    if(newRef.current && !newRef.current.contains(e.target) && anotherRef.current && !anotherRef.current.contains(e.target)){
      setOpen(false)
    }
  }

  useEffect(()=>{
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  },[])

  
  return (
    <div className=' self-center flex flex-col sticky bottom-10  '>
    {
      isSmallScreen && open &&
     <List ref={newRef} sx={{p:2, m:1, display:'flex', flexDirection:'column',backgroundColor:'#686D76',borderRadius:2}}>
      {
        menu.map(item=>(
          <ListItem key={item.id} sx={{mb:1,width:"200px",borderRadius:2, backgroundColor:category === item.id?"#DC5F00":"",":hover":{backgroundColor:"#DC5F00"}}}>
            <Typography lineHeight={1} onClick={()=>setCategory(item.id)} sx={{width:'120px', px:1,fontSize:15,color:'white',cursor:'pointer'}}>{item.name}</Typography>
          </ListItem>
        ))
      }
     </List>
    }
    <Chip ref={anotherRef} variant="outlined" icon={<MdOutlineRestaurantMenu className='inline'/>} label="menu" 
     sx={{width:'100px',display:isSmallScreen?'flex':'none',alignSelf:'center',fontSize:15,color:'black',backgroundColor:'#C8ACD6'}} 
     onClick={()=>setOpen(!open)}
     clickable />
    </div>
  )
}