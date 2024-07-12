import React from 'react';
import Button from '@mui/material/Button';
import { format } from 'date-fns';
//we need order._id
const OrderDetails = ({ order }) => {
  const convertDate = (date) =>{
    const formattedDate = format(date, 'MMMM d, yyyy, h:mm:ss a');
    return formattedDate
  }
    return (
        <div className="w-100 mx-20 shadow-2xl rounded-lg my-4 bg-white border-2 border-gray-600">
            <div className="p-2">
              <div className='flex flex-row items-center justify-between'>              
                <h1 className='font-semibold'>Delivery</h1>
                {
                  order.isDelivered ? <Button sx={{mt:1}} color="success">Delivered</Button> : <Button color="error">Pending</Button>
                }
              </div>
              <hr className='text-black'/>
                <div className=" p-1 text-white rounded-xl flex flex-col justify-between">
                  <p className="text-black font-thin">{order.transactionId}</p>
                  <p className="text-black font-thin">{convertDate(order.date)}</p>
                </div>
                <hr className='text-black'/> 
                <div className=" p-1 text-white rounded-xl">
                    <h2 className="text-lg font-semibold text-blue-900">Shipping Address</h2>
                    <p className='text-black'>{order.address.street}, {order.address.city}, {order.address.country}</p>   
                </div>
                <hr className='text-black'/>
                <div className=" p-1 text-white rounded-xl">
                    <h2 className="text-lg font-semibold text-blue-900">Order Items</h2>
                    <ul className="list-disc pl-4">
                        {order.orderItem.map((item, index) => (
                          <li key={index} className="text-black">{item.name} - {item.quantity}</li>
                        ))}
                    </ul>
                </div>
                <hr className='text-black'/>
                <p className="font-bold text-black">{order.orderAmount} INR/-</p>
            </div>
        </div>
    );
};

export default OrderDetails;


