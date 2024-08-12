import React from 'react';
import { Stack,Box, ImageList, ImageListItem } from '@mui/material';
import Banner from '../components/Banner/Banner';
import menu from '../utils/menu';
import { Link } from 'react-router-dom';
import { contents } from '../utils/banner';
import Footer from '../components/Footer/Footer';
const MainPage = () => {
  
  return (
    <div className=' h-full'>
     <Stack direction={'column'}>
       <Banner use={'homePage'} contents={contents}/>
       <Box sx={{display:'flex',flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        <h1 className='text-3xl mt-10'>Order Now!</h1>
          <ImageList cols={3} >
            {
              menu.map((item)=>(
               <ImageListItem key = {item.id} className='menu-list m-2 flex flex-col items-center justify-center'>
                <Link to={'/menu'} className='p-2 menu-item rounded-xl flex flex-col items-center justify-center bg-violet-400 '>
                  <img src={item.image} alt=''/>
                </Link>
                <h1 className='text-lg font-nunito mt-1'>{item.name}</h1>
                </ImageListItem>
              ))
            }
          </ImageList>

       </Box>
       <Footer/>
     </Stack>
    </div>
  );
};

export default MainPage;