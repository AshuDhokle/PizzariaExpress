import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import ReactLoading from 'react-loading';
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { IoMdCheckbox } from "react-icons/io";
import UpdateDeliveryPopup from './updateDeliveryPopup';
const OrderList = () => {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await Axios.get('http://localhost:3000/api/admin/order/orderList');
        setOrderList(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className=' m-4 flex flex-col items-center justify-center  '>
      {loading ? (
        <ReactLoading type='spin' color='blue' height={200} width={200} />
      )
       :
        ( 
          <table className='w-full text-sm text-left rtl:text-right text-black border border-3 border-black animate-fade-in'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 h-8 text-center'>
             <tr className='px-6 py-3'>
              <th className=' w-1/5'>User</th>
              <th>Order Details</th>
              <th>Delivered</th>
             </tr>
            </thead>
            <tbody className='border border-3 border-black text-center'>
              {
                orderList.map((order,idx)=>(
                  <tr  key={idx} className='odd:bg-blue-100 odd:dark:bg-gray-900 even:bg-blue-200 even:dark:bg-gray-800 border-b dark:border-gray-700'>  
                    <td>
                      <UserDetails name={order.name} email={order.email} userId={order.userId} />
                    </td>
                    <td className='p-4 flex flex-col items-center justify-center'>
                      <OrdersDetails amount={order.orderAmount} createdAt={order.createdAt} items={order.orderItems} shipping={order.shippingAddress}/>
                    </td>
                    <td>
                      <DeliveryDetails delivered ={order.isDelivered} id={order._id}/>
                    </td>
                  </tr>
                      
                ))
              } 
            </tbody>         
          </table>
        )   
      }
      
    </div>
  );
};

const UserDetails = ({name,email,userId}) =>{
  return(
    <div> 
      <h1>{name}</h1>
      <h1>{email}</h1>
      <h1>{userId}</h1>
      
    </div>
  )   
}

const OrdersDetails = ({createdAt,amount,items,shipping}) =>{
  return(
    <div className=' text-start'>
      <h1>Order Date : {createdAt}</h1>
      <h1>Amount : {amount} /-</h1>
      <h1>Shipping : </h1>
      <div>
        <h1>{shipping.street}, {shipping.city}, {shipping.country}</h1>
      </div>
      
      <h1>Items : </h1>
        {
          items.map((item,idx)=>(
            <div key = {idx}>
              <h1>{item.name} [{item.size}]</h1>
            </div>
          ))
        }
    </div>
  )
}

const DeliveryDetails = (props) =>{
  const [check,setCheck] = useState(props.delivered);
  const [trigger,setTrigger] = useState(false);
  const updateDelivery = async(id) =>{
      const response = await Axios.put(`http://localhost:3000/api/admin/order/${id}`)
      if(response){
        console.log(response);
        setCheck(true);
        setTrigger(false)
      }           
  }
  
  const resetTrig = () =>{
    setTrigger(false);
  }

  return(
    <div>
      {
      check 
        ? <IoMdCheckbox className='size-6' />
        : <MdCheckBoxOutlineBlank className='size-6' onClick={()=>setTrigger(true)}/>
      }
      <UpdateDeliveryPopup trig = {trigger} updateDelivery={updateDelivery} id = {props.id} resetTrig={resetTrig}/>
    </div>
  )
}

export default OrderList;
