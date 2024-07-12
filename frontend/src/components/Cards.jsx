import React, { useEffect, useState } from 'react';
import { GiFullPizza } from 'react-icons/gi';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cards = (props) => {
    const dispatch = useDispatch();
    const [order, setOrder] = useState({
        size: '',
        quantity: 0,
        price: 0,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const idx = props.pizza.size.findIndex((item) => item === order.size);
        if (idx !== -1) {
            const price = props.pizza.price[idx] * order.quantity;
            setOrder((prevState) => ({ ...prevState, price }));
        }
    }, [order.size, order.quantity]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(
            addToCart({
                pizza: props.pizza,
                size: order.size,
                quantity: parseInt(order.quantity),
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
        const { name, value } = e.target;
        setOrder((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        <div className='m-2 p-0 h-fit flex flex-col items-center justify-center rounded-lg shadow-xl bg-white '>
            <h1 className='self-start shadow-xl bg-blue-400 p-2 text-white w-full text-lg text-center'>{props.pizza.name}</h1>

            <img className='m-2 size-48 rounded-xl' src={props.pizza.img} alt='Pizza' />
            {props.pizza.veg ? (
                <img src='https://i.pinimg.com/736x/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.jpg' className='size-4 self-start ml-2' alt='Veg' />
            ) : (
                <img src='https://thumbs.dreamstime.com/b/non-vegetarian-sign-veg-logo-symbol-red-color-food-grade-circle-312777489.jpg' className='size-4 self-start ml-2' alt='Non-Veg' />
            )}
            <div>
                <form className='' onSubmit={handleSubmit}>
                    <div className='flex flex-row justify-center items-center'>
                        <div className='w-1/2 m-2 flex flex-col items-center justify-center'>
                            
                            <select className='p-2 rounded-xl border-2' name='size' id='select-varients' onChange={handleInputChange}>
                                <option>Select One</option>
                                {props.pizza.size.map((varient, idx) => (
                                    <option value={varient} key={idx}>
                                        {varient}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='w-1/2 flex flex-col items-center justify-center'>
                            
                            <select className='w-32 m-2 p-2 rounded-xl border-2 ' name='quantity' id='quantity' onChange={handleInputChange}>
                                <option>Select One</option>

                                {Array.from({ length: 10 }, (_, index) => index + 1).map((x) => (
                                    <option value={x} key={x}>
                                        {x}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='m-1 flex flex-row items-center justify-between'>
                        <h1 className='m-2 bg-gradient-to-r from-green-500 to-sky-400 bg-clip-text text-transparent font-semibold'> {order.price} INR /-</h1>
                        <button className='bg-sky-400  p-2 rounded-xl shadow-xl text-white' type='submit'>
                            Add to cart
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Cards;
