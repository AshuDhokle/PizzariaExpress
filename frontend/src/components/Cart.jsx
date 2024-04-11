import React, { useEffect, useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { removeFromCart,addToCart , selectCart} from '../features/cart/cartSlice';
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import Checkout from './Checkout';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [subTotal,setSubTotal] = useState(0);
  const [orders,setOrders] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  console.log(cart);
  useEffect(()=>{
    setOrders(cart);  
  },[cart])
  
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
  
  const handleDispatch = (item) =>{
    window.location.reload(false);
    dispatch(removeFromCart({pizza:item.pizza,size:item.size,quantity:parseInt(item.quantity)}))
  }

  const handleAdd = (item) =>{
    if(item.quantity>=10){
      alert('Cannot add more than 10');
    }else{
      dispatch(addToCart({pizza:item.pizza,size:item.size,quantity:parseInt(item.quantity+1)}))
    }
  }

  const handleSubtract = (item) =>{
    if(item.quantity<=0){
      handleDispatch(item)
    }else{
      dispatch(addToCart({pizza:item.pizza,size:item.size,quantity:parseInt(item.quantity-1)}))
    }
  }

  return (
    <div className='mt-8 grid grid-cols-1 p-2 '>
       <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 animate-fade-in'>
         {orders.map((item,idx)=>{
          return (
            <div key={idx} className='flex flex-col  sm:col-span-2 lg:col-span-1'>
            <h1 className='mt-2 mx-2 text-lg lg:text-xl bg-blue-500 text-white px-2 text-center ' >{item.pizza.name} [{item.size}]</h1>
            <div className=' flex flex-row items-center justify-center mb-2 mx-2 p-2 bg-slate-100 rounded-xl shadow-xl'>
               
               <div className='flex flex-col'>
               
               <div className=''>
                <h1 className='my-2 text-l'>Quantity <span><button className='my-2 bg-cyan-300 rounded-xl shadow-xl' onClick={()=>{ handleAdd(item)}} ><IoMdAdd /></button></span>  {item.quantity} <span><button className=' my-2 bg-red-300 rounded-xl shadow-xl ' onClick={()=>{handleSubtract(item)}}><RiSubtractFill /></button></span></h1>               
               </div>                                                                                                      
                <h1 className='self-start m-1 text-l' >Price :- {item.pizza.price[findInd(idx,item.size)]} X {item.quantity} = {item.price} /-</h1>
                </div>
               <img src={item.pizza.img} className='rounded-xl size-32 lg:size-40'/>
               <MdDeleteOutline onClick={()=>handleDispatch(item)} className='m-4 size-8 text-red-500' />
              </div>
            </div>
          )
         })}
         </div>
         {
          subTotal > 0 
          ?
           <div className='w-72 flex flex-col items-center justify-center p-4 rounded-xl shadow-xl text-white hover:text-yellow-300 font-semibold bg-red-500 '>
            <h1 className='text-xl m-2 text-white'>Subtotal = {subTotal} /-</h1>
            <Checkout amount = {subTotal}/>
           </div>
          :
          <div className='flex flex-col items-center justify-center p-4 rounded-xl shadow-xl bg-red-400 '>
            <h1 className='text-xl m-2 text-white'>Cart is empty !!</h1>
            <Link className='bg-gradient-to-r from-green-500 to-sky-400  p-2 rounded-lg shadow-xl text-white ' to={'/user/home'}>Add Pizzas!</Link>
          </div>
         }
      </div>
  )
}

export default Cart