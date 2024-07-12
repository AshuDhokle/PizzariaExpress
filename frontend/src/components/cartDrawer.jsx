import { useState,useEffect } from 'react';
import {Drawer,Button,List,ListItem,ListItemButton, Divider} from '@mui/material'
import {useSelector} from 'react-redux'
import {selectCart} from '../features/cart/cartSlice';
import Checkout from './Checkout';
import CartCard from './cartCard';

const CartDrawer = () => {
   const [open, setOpen] = useState(false);
   const cart = useSelector(selectCart);
   const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
   };

  

  return (
    <div>
        <Button onClick={()=>toggleDrawer(true)}>Cart</Button>
          <Drawer
            anchor={'right'}
            open={open}
            onClose={()=>toggleDrawer(false)}
            PaperProps={{
                sx: { width:{sm:'50%', lg:"25%"} },
              }}
          >
        <List sx={{p:2}}>
         {cart.length > 0 && cart.map((item, index) => (
          <ListItem key={index} disablePadding>
                <CartCard item = {item}/>
          </ListItem>
         ))}
        </List>
        <Divider/>
         <Subtotal toggleDrawer={toggleDrawer}/>
        </Drawer>
        
    </div>
  );
}

const Subtotal = ({toggleDrawer}) =>{
    const [subTotal,setSubTotal] = useState(0);
    const cart = useSelector(selectCart);
    useEffect(()=>{
        let total = 0;
        for(let i = 0;i<cart.length;i++){
          total = total + parseInt(cart[i].price)
        }
        setSubTotal(total)
      },[cart])
    
      const findInd = (idx,sz)=>{
        let res = -1;
       
        for(let i = 0;i<cart[idx].pizza.size.length;i++){
          if(cart[idx].pizza.size[i] == sz){
            res = i
            break;
          }
        
      }
        return res;
      }
    return(
       <>
        {
          subTotal > 0 
          ?
           <div className='w-fit flex flex-col items-center justify-center p-4 rounded-xl text-black '>
            <h1 className='text-xl m-2 text-black'>Subtotal = {subTotal} /-</h1>
            <Checkout amount = {subTotal}/>
           </div>
          :
          <div className=' w-fit flex flex-col items-center justify-center p-4 rounded-xl '>
            <p>Cart is Empty</p>
            <Button variant='outlined' onClick={()=>toggleDrawer(false)} >Add Pizzas!</Button>
          </div>
         }
       </>
    )
}


export default CartDrawer
