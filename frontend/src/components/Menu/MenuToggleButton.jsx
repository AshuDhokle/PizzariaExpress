import React, { useEffect, useState,useRef } from 'react'
import { ListItem,List,useMediaQuery, Typography,Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import menu from '../../utils/menu';
import { MdOutlineRestaurantMenu } from "react-icons/md";
export const MenuToggleButton = ({category,setCategory}) =>{
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