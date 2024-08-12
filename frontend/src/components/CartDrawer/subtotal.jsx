import { useState,useEffect } from 'react';
import {Button,Box, Chip, Modal, Typography} from '@mui/material'
import {useSelector} from 'react-redux'
import {selectCart} from '../../features/cart/cartSlice';
import {couponCodes} from '../../utils/coupon'
export const Subtotal = ({finalTotal,setFinalTotal,toggleDrawer}) =>{
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
            <Modal open={open} onClose={handleClose} 
             aria-labelledby="modal-modal-title"
             aria-describedby="modal-modal-description"
            >
             <Box
             sx={{ position: 'absolute', top: '50%',
              left: '50%', transform: 'translate(-50%, -50%)',
              width: 400, bgcolor: 'background.paper',
              boxShadow: 24, p: 4,
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
