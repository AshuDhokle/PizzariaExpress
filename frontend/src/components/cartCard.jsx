import React from 'react'
import { GrFormSubtract } from "react-icons/gr";
import { IoIosAdd } from "react-icons/io";
import { FaLongArrowAltRight } from "react-icons/fa";
import menu from '../utils/menu';
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
        <div className='flex flex-row items-center justify-between'>
         <div className='flex flex-row items-center'>
         <FaLongArrowAltRight className='size-6 text-green-500' />
         
         <h1 className='m-1 text-lg font-nunito font-semibold'>{item.pizza.name}</h1>
         <p className='mx-1 text-gray-500 text-sm'>{menu[item.pizza.category-1].name}</p>
         </div>
         <p className='font-semibold'>{item.price}/-</p>
         </div>
        <div className='m-1 flex flex-row items-center'>
         <IoIosAdd className='size-6 mx-2 text-white bg-violet-500 hover:bg-violet-400 rounded-full' onClick={()=>handleAdd(item)}/> 
         <p className='text-xl mb-1'>{item.quantity}</p>
         <GrFormSubtract className='size-6 mx-2 text-white bg-violet-500 hover:bg-violet-400 rounded-full' onClick={()=>handleSubtract(item)}/>
        </div>
    </div>
  )
}

export default CartCard