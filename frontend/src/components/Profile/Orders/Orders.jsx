import React, { useEffect, useState } from 'react'
import axios from 'axios'
import OrderDetails from './ordersDetails'
const Orders = ({currentTab,index}) => {
    
    const [order,setOrder] = useState([])
    const [loading,setLoading] = useState(true); 
    useEffect(()=>{
      async function fetchData(){
        
        setLoading(true);
        try {
          const userId = JSON.parse(localStorage.getItem('User'))._id;
          const response = await axios.get(`http://localhost:3000/api/user/orders/getOrders`,{
            params:{
              id:userId,
            }
          })
          if(response.status === 200){
            setOrder(response.data.map((item)=>(item)))
          }
              
        }catch (error) {
          console.log('Someting Went Wrong');
        }finally{
          setLoading(false)
        }             
      }
      
      fetchData(); 
    },[])
  
    return (
    <div className=''>
    {
      currentTab === index && <div className='p-2 overflow-y-scroll h-[510px]'>
        {
          loading 
           ? <p>Loading...</p>
           : <div>
              {
               order.map((item,idx)=>(
                <OrderDetails key={idx} item = {item}/>
               ))
              }
           </div> 
        }
      </div>
    }
    </div>
  )
}

export default Orders