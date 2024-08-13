import React from 'react';
import Button from '@mui/material/Button';
import { MdDone } from "react-icons/md";
import { MdOutlinePending } from "react-icons/md";
import { OrderDiscriptionModel } from './ordersDescriptionModel';
import { convertDate } from '../../utils/formatDate';
import { formatOrdersString } from '../../utils/formatOrdersString';
const OrderDetails = ({ item }) => {
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
   <div className='border-2 m-2 p-2'>
      <div className='flex flex-row'>
      <img src='/images/delivery.png' className='size-24' />
      <div className='flex flex-row m-1 p-1 w-full items-center justify-between'>
      <h1 className='mx-2'>{item.shippingAddress}</h1>
      {item.isDelivered ? <div className='flex flex-row items-center '><MdDone className='mx-2 p-1 size-6 rounded-full bg-green-500  text-white '/><h1><span>Delivered at</span> {convertDate(item.updatedAt)}</h1></div> : <div className='flex flex-row items-center'><MdOutlinePending className='size-8 p-1 mx-2 rounded-full bg-yellow-500' /><h1>Pending</h1></div> }
      </div>
    </div>
    <div>
      <h1 className='mx-2 text-sm font-light'>#{item._id}</h1>
      <h1 className='mx-2'><span>Ordered At</span> {convertDate(item.createdAt)}</h1>
    </div>
    <hr/>
    <div>
      <h1 className=' p-2 text-sm'>{formatOrdersString(item.orderItems)}</h1>
    </div>
    <hr/>
    <div>
      <Button onClick={()=>handleOpen()}>View Details</Button>
      <OrderDiscriptionModel item={item} open={open} handleClose={handleClose}/>
    </div>
   </div>
  );
};



export default OrderDetails;
