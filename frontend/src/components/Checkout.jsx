import React from 'react'
import StripeCheckout from 'react-stripe-checkout' 
import Axios from 'axios';
import {useDispatch} from 'react-redux'
import { removeFromCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
const Checkout = (props) => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const tokenHandler = async(token) =>{
      //console.log(token);
      const user = localStorage.getItem('User');
      
      const amount = props.amount;
      const cart = localStorage.getItem('cartItems')
      try {
        if(!user){
          navigate("/user/login")
        }
        const response = await Axios.post('http://localhost:3000/payment',{token,amount,cart,user});
        
        try {
          const orders = await Axios.post('http://localhost:3000/orders',{response,amount,cart,user});
                    

          if(orders.status === 200){
            JSON.parse(cart).forEach(element => {
              dispatch(removeFromCart(element));
              window.location.reload(false);
            });
          }
        } catch (error) {
          console.log(error);
        }      
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div>
      <StripeCheckout
       amount={props.amount*100} 
       shippingAddress
       token={tokenHandler}
       currency='INR'
       stripeKey={import.meta.env.VITE_STRIPE_PUBLIC_KEY}
      >

        <button>Pay Now</button>
      </StripeCheckout>
    </div>
  )
}

export default Checkout