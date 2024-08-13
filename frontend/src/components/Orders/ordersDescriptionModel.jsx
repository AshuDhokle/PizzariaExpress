import React from 'react';
import { Modal,Typography,Box,Fade,Backdrop } from '@mui/material';
import { MdDone } from "react-icons/md";
import { MdOutlinePending } from "react-icons/md";
import { convertDate } from '../../utils/formatDate';
export const OrderDiscriptionModel = ({item,open,handleClose}) =>{

    return(
      <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      sx={{alignSelf:'center',justifySelf:'center',backgroundColor:'white'}}
    >
      <Fade in={open}>
        <Box sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: 500,bgcolor: 'background.paper',boxShadow: 24,p: 4}}>
          <Typography variant='h6' sx={{fontWeight:600}}>Order #{item._id}</Typography>
          <hr/>
          {item.isDelivered ? <div className='flex flex-row items-center my-2'><MdDone className='mx-2 p-1 size-6 rounded-full bg-green-500  text-white '/><h1><span>Delivered at</span> {convertDate(item.updatedAt)}</h1></div> : <div className='my-2 flex flex-row items-center'><MdOutlinePending className='size-8 p-1 mx-2 rounded-full bg-yellow-500' /><h1>Pending</h1></div> }
          <hr />
          <div className='m-2 mt-5'>
            <h1 className='mb-2 font-semibold' >{item.orderItems.length} Item</h1>
            <div>
              <ul>
              {
                item.orderItems.map((order,idx)=>(
                  <li key={idx} className='flex flex-row items-center justify-between'>
                    <p>{order.name} x {order.quantity}</p>
                    <p>{order.price}/-</p>
                  </li>                             
                ))
                
              }
              <hr/>
  
              <div className='mt-2 flex flex-row items-center justify-between'>
                <p className='font-bold'>Total</p>
                <p className='font-bold'>{item.orderAmount}/-</p>
              </div>  
  
              </ul>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
    )
  }