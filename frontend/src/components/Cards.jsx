import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoCartOutline } from "react-icons/io5";
import { FormControl, InputLabel, MenuItem, Select,Button, Box } from '@mui/material';

const Cards = ({pizza}) => {
    const dispatch = useDispatch();
    const [order, setOrder] = useState({
        size: '',
        quantity: 0,
        price: 0,
    });
    const [selectedSize,setSelectedSize] = useState(0);
    console.log(selectedSize);
    
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(
            addToCart({
                pizza: pizza,
                size: pizza.size[selectedSize],
                quantity: 1,
            })
        );

        toast('Pizza Added to the cart');
        // const obj = JSON.stringify(order);
        // console.log(obj);

        //const response = await axios.post('http://localhost:3000/orders', obj);
        //console.log(response);
        //navigate(`/order`);
    };

    const handleInputChange = (e) => {
        setSelectedSize(e.target.value)
    };

    return (
        <div className='m-2 w-60 py-2 h-fit justify-self-center flex flex-col items-center rounded-lg shadow-xl bg-white '>

            <img className='w-60 h-48 ' src={pizza.img} alt='Pizza' />
            <div className='mb-2 p-2 w-full flex flex-row items-center '>
            <h1 className=' text-gray-500 w-full text-lg '>{pizza.name}</h1>
            <img  src={pizza.veg ? '/images/veg.png' : '/images/non-veg.png'} className='size-6'/> 
            </div>
            <div>
                <Box component={'form'} onSubmit={handleSubmit}>
                    <p className='font-normal text-gray-600'>Select Varient : </p>
                    <div className='flex flex-row justify-center items-center'>
                        <Select
                           color='success'
                           value={selectedSize}
                           defaultValue={0}
                           onChange={handleInputChange}
                           sx={{width:220,color:'black'}}
                        >
                            <MenuItem value={0}>{pizza.size[0]}</MenuItem>
                          {pizza.size.map((sz,idx)=>(
                             idx>0 && <MenuItem key={idx} value={idx} >{sz}</MenuItem>
                          ))}
                        </Select>

                    </div>
                    <Button type='submit' sx={{mt:2,width:220 ,backgroundColor:'#06D001' ,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around',":hover":{backgroundColor:'#40A578'}}}> 
                        <p className='text-white font-nunito text-lg'>{pizza.price[selectedSize]}/-</p> 
                        <IoCartOutline className='size-8 text-white cursor-pointer' />
                    </Button> 
                   
                </Box>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Cards;


 