import { useState,useEffect } from 'react';
import {Drawer,Button,List,Box,ListItem, Divider, Select, MenuItem,InputLabel, FormControl,Badge, Chip, Modal, Typography} from '@mui/material'
import {useSelector} from 'react-redux'
import {selectCart} from '../../features/cart/cartSlice';
import { IoCartOutline } from "react-icons/io5";
import CartCard from './CartCards/cartCard';
import {loadStripe} from '@stripe/stripe-js';
import AddAddress from '../AddAddress/AddAddress'
import axios from 'axios';
import {couponCodes} from '../../utils/coupon'
import { selectAddress } from '../features/address/addressSlice';
const CartDrawer = () => {
  const [open, setOpen] = useState(false);
  const cart = useSelector(selectCart);
  const [finalTotal,setFinalTotal] = useState();
  const [deliveryAddress,setDeliveryAddress] = useState();
  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };
   
  const handlePayment = async() =>{
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
      const body = {
        products : cart,
        price:finalTotal,
        address: deliveryAddress
      }
      
      const response = await axios.post('http//localhost:3000/api/payment/create-checkout-session',body)
      const session = await response.data;
      const result = await stripe.redirectToCheckout({
        sessionId : session.id,
      })
      if(result.error){
        throw new Error(result.error)
      }
    } catch (error) {
      console.log(result.error);
    }
  }
  

  return (
    <div className='mr-6' >
        <Badge 
        badgeContent={cart.length}
        color='success'
        onClick={()=>toggleDrawer(true)}
        sx={{cursor:'pointer'}}
        >
          <IoCartOutline className='size-8 text-green-600 ' />
        </Badge>
          
        <Drawer
          anchor={'right'}
          open={open}
          onClose={()=>toggleDrawer(false)}
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
        <Button sx={{mb:2,color:'white',backgroundColor:'#06D001', ":hover":{backgroundColor:'#059212'}}} onClick={handlePayment}> Checkout</Button>
        </div>
        </Drawer>
    </div>
  );
}

const Subtotal = ({finalTotal,setFinalTotal,toggleDrawer}) =>{
    const [subTotal,setSubTotal] = useState(0);
    const [selectedCoupon,setSelectedCoupon] = useState();
    const [open,setOpen] = useState(false);
    const cart = useSelector(selectCart);
    useEffect(()=>{
        let total = 0;
        for(let i = 0;i<cart.length;i++){
          total = total + parseInt(cart[i].price)
        }
        setSubTotal(total)
        setFinalTotal(total)
    },[cart])
    
    const handleClose = () =>{
      setOpen(false);
    }
      
    const openModal = () =>{
      setOpen(true)
    }
    
    const addCoupon = (value) =>{
      setSelectedCoupon(value)
      let total = (subTotal - (subTotal * value.discount)/100);
      setFinalTotal(total);
      handleClose();
    }

    return(
       <>
        {
          subTotal > 0 
          ? 
           <div className='my-2'>
            <div className='p-2 flex flex-row items-center justify-between'>
            <Chip label='Add Coupon' onClick={openModal} />
            {selectedCoupon && <h1>{selectedCoupon.code}</h1> }
            </div>
            <Modal
             open={open}
             onClose={handleClose}
             aria-labelledby="modal-modal-title"
             aria-describedby="modal-modal-description"
            >
             <Box
             sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
             }}
            >
              {
                couponCodes.map((coupon,idx)=>(
                  <Box key={idx} onClick={()=>addCoupon(coupon)} sx={{m:2, p:2,color:'white', backgroundColor:'#3FA2F6',cursor:'pointer'}}>
                    <Typography>{coupon.code}</Typography>
                    <p className='font-bold text-white'>{coupon.discount}%</p>
                    <p className='text-white'>{new Date(coupon.expirationDate).toDateString()}</p>
                  </Box>
                ))
              }
             </Box>
            </Modal>
            <h1 className='font-nunito text-lg text-black'>Total : {finalTotal} /-</h1>
           </div>
          :
          <div className='p-4 rounded-xl '>
            <p>Cart is Empty</p>
            <Button variant='outlined' onClick={()=>toggleDrawer(false)} >Add Pizzas!</Button>
          </div>
         }
       </>
    )
}

const SelectAddress = ({deliveryAddress,setDeliveryAddress}) =>{
  
  // const makeAddressString = (address) => {
  //   const str = address.street + ', ' + address.city + 
  // }
  const addresses = useSelector(selectAddress);
  console.log(addresses);
  const handleChange = (e) =>{
    setDeliveryAddress(e.target.value)
  }
  return(
    <div className='my-4 flex flex-col items-center justify-center'>
      <FormControl sx={{m:2}}>
        <InputLabel id="address">Address</InputLabel>
          <Select
           labelId="address"
           id='address' 
           label='Address'
           value={deliveryAddress}
           onChange={handleChange}
           sx={{width:300,color:'black'}}
          >
          {addresses && addresses.length > 0 &&
            addresses.map((address,idx)=>(
              <MenuItem key={idx} value={address}>{address.address}</MenuItem>
            ))
          }
          </Select> 
        </FormControl>
      <AddAddress/>
    </div>
  )
}


const DiscountCoupouns = ({coupoun}) =>{
 console.log(coupoun);
  return(
  <div className='flex flex-col'>
    <h1>{coupoun.code}</h1>
    <h1>{coupoun.discount}</h1>
    <p>Valid Till : <span>{new Date(coupoun.expirationDate).toDateString()}</span></p>
  </div>
 )
}

export default CartDrawer
