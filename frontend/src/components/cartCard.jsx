import React from 'react'
import { GrFormSubtract } from "react-icons/gr";
import { IoIosAdd } from "react-icons/io";

import { useDispatch } from 'react-redux';
import { removeFromCart,addToCart , selectCart} from '../features/cart/cartSlice';
const CartCard = ({item}) => {
    const dispatch = useDispatch()
    const handleAdd = (item) =>{
        if(item.quantity>=10){
          alert('Cannot add more than 10');
        }else{
          dispatch(addToCart({pizza:item.pizza,size:item.size,quantity:parseInt(item.quantity+1)}))
        }
    }
    
    const handleSubtract = (item) =>{
        if(item.quantity<=1){
          handleDispatch(item)
        }else{
          dispatch(addToCart({pizza:item.pizza,size:item.size,quantity:parseInt(item.quantity-1)}))
        }
    }

    const handleDispatch = (item) =>{
        dispatch(removeFromCart({pizza:item.pizza,size:item.size,quantity:parseInt(item.quantity)}))
    }

    return (
    <div className='flex flex-col w-80'>
        <div className='flex flex-row'>
         <img src={item.pizza.img} alt={item.pizza.name} className='size-20 m-2 rounded-3xl'/>
         <div className='flex flex-col items-center justify-center'>
         <h1 className='m-2 text-xl font-nunito font-semibold'>{item.pizza.name}</h1>
         <p className='font-bold'>{item.price}/-</p>
         </div> 
        </div>
        <div className='flex flex-row items-center'>
         <IoIosAdd className='size-6 m-2 hover:bg-green-300 rounded-full' onClick={()=>handleAdd(item)}/> 
         <p className='text-xl mb-1'>{item.quantity}</p>
         <GrFormSubtract className='size-6 m-2 hover:bg-green-300 rounded-full' onClick={()=>handleSubtract(item)}/>
        </div>
    </div>
  )
}

export default CartCard