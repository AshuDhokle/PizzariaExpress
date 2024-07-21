import React,{useEffect,useState} from 'react';
import axios from 'axios'
import Navbar from './components/Navbar';
import { Stack,Box, ImageList, ImageListItem } from '@mui/material';
import Banner from './components/Banner';
import menu from './utils/menu';
import { Link } from 'react-router-dom';

import { contents } from './utils/banner';
const MainPage = () => {
  
  return (
    <div className=' h-full'>
     <Navbar />
     <Stack direction={'column'}>
       <Banner use={'homePage'} contents={contents}/>
       <Box sx={{display:'flex',flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        <h1 className='text-3xl '>Order Now!</h1>
          <ImageList cols={3} >
            {
              menu.map((item)=>(
               <ImageListItem key = {item.id} className='menu-list m-2 flex flex-col items-center justify-center'>
                <Link to={'/menu'} className='menu-item flex flex-col items-center justify-center bg-slate-300 '>
                  
                  <h1>{item.name}</h1>
                </Link>
                </ImageListItem>
              ))
            }
          </ImageList>

       </Box>
     </Stack>
    </div>
  );
};

export default MainPage;