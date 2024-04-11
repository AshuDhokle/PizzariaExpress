import React, { useEffect, useState } from 'react'
import axios from 'axios'
import OrderDetails from './ordersDetails'
const Orders = () => {
    
    const [order,setOrder] = useState([])
    const [loading,setLoading] = useState(true); 
    useEffect(()=>{
      async function fetchData(){
        setLoading(true);
        const userId = JSON.parse(localStorage.getItem('User'))._id;
        const response = await axios.get(`http://localhost:3000/orders`,{
          params:{
            id:userId,
          }
        })
        if(response.status === 200){
           // console.log(response);
            setOrder(response.data.map((item)=>({
              email:item.email,
              userName:item.name,
              orderAmount:item.orderAmount,
              orderItem:item.orderItems,
              address:item.shippingAddress,
              transactionId:item.transactionId,
              isDelivered:item.isDelivered
            }))
            );
            setLoading(false);          
           
        }
      }
      
      fetchData(); 
    },[])
  
    return (
    <div className='m-2 p-2 bg-blue-400 grid grid-col-1 lg:grid-cols-3 '>
        {
          loading  
          ? <h1>loading ...</h1>
          : order.length > 0 && order.map((item)=>(
             <OrderDetails key={item.id} order={item}/> 
          )) 
            
        }
    </div>
  )
}

export default Orders