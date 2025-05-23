import { useState } from 'react';
import {Drawer,Button,List,ListItem, Divider, Select, MenuItem,InputLabel, FormControl,Badge} from '@mui/material'
import {useSelector} from 'react-redux'
import {selectCart} from '../../features/cart/cartSlice';
import { IoCartOutline } from "react-icons/io5";
import CartCard from './CartCards/cartCard';
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';
import { selectUser } from '../../features/user/userSlice';
import { Subtotal } from './subtotal';
import { SelectAddress } from './selectAddress';
import Loading from 'react-loading';

const CartDrawer = () => {
  const cart = useSelector(selectCart);
  
  const [open, setOpen] = useState(false);
  const [finalTotal,setFinalTotal] = useState();
  const [deliveryAddress,setDeliveryAddress] = useState();
  const [loading, setLoading] = useState(false);

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };
  const user = useSelector(selectUser); 
  const handlePayment = async() =>{
    setLoading(true);
    try {
      const cartSize = cart.length;
      
      if(cartSize > 2) {
        alert('Remove one item!!!')
        return;
      }
      
      if(deliveryAddress === undefined || deliveryAddress === null || deliveryAddress.length === 0 ){
        alert('Select Address')
        return ;
      }

      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
      const body = {
        products : cart,
        price:finalTotal,
        address: deliveryAddress,
        userId: user._id
      }
      
      const response = await axios.post('https://pizzaria-express-six.vercel.app/api/payment/create-checkout-session',body)
      const session = await response.data;
      const result = await stripe.redirectToCheckout({
        sessionId : session.id,
      })
      if(result.error){
        throw new Error(result.error)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
 }
  
  return (
    <div className='mr-6' >
        <Badge badgeContent={cart.length} color='success'
        onClick={()=>toggleDrawer(true)} sx={{cursor:'pointer'}}
        >
          <IoCartOutline className='size-8 text-green-600 ' />
        </Badge>
          
        <Drawer anchor={'right'} open={open} onClose={()=>toggleDrawer(false)}
          PaperProps={{
            sx: { width:{sm:'50%', lg:"25%"},justifyContent:'space-between' },
          }}
        >
        <div>
         <List sx={{p:2}}>
          {cart.length > 0 && cart.map((item, index) => (
          <ListItem key={index} disablePadding>
            <CartCard item = {item}/>
          </ListItem>
         ))}
        </List>
        <SelectAddress deliveryAddress = {deliveryAddress} setDeliveryAddress = {setDeliveryAddress} />
        </div>
        <div className='flex flex-col p-2'>
        <Divider/>
        <Subtotal finalTotal = {finalTotal} setFinalTotal={setFinalTotal} toggleDrawer={toggleDrawer}/>
        <Button sx={{mb:2,color:'white',backgroundColor:'#06D001', ":hover":{backgroundColor:'#059212'}}} onClick={handlePayment}> {loading ? <Loading type='spin' color='white' height={30} width={30}/> : 'checkout'} </Button>
        </div>
        </Drawer>
    </div>
  );
}

export default CartDrawer
