import {createSlice,nanoid} from '@reduxjs/toolkit'

const initialCart = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const initialState = {
    cart:initialCart,
}

export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart: (state,action)=>{
            
            
            const findIdx = (sz,pizza) =>{
                let res = -1;
                for(let i = 0;i<pizza.size.length;i++){
                    if(pizza.size[i] == sz){
                        res = i
                        break;
                    }
                }
                return res;
            }
            
            const obj = {
                pizza : action.payload.pizza,
                size  : action.payload.size,
                quantity : action.payload.quantity,
                price : action.payload.pizza.price[findIdx(action.payload.size,action.payload.pizza)] * action.payload.quantity
            }
            
            // console.log("asd : ");
            // console.log(obj);
            
            const alreadyExists = state.cart.find(item => {
                return item.pizza._id == obj.pizza._id
            })
           
            

            if(alreadyExists){
                const updatedCart = state.cart.map(item => item.pizza._id === obj.pizza._id ? obj:item);
                state.cart = updatedCart;
                localStorage.setItem('cartItems',JSON.stringify(updatedCart));
            }
            else{
                const updatedCart = [...state.cart,obj];
                state.cart = updatedCart;
                localStorage.setItem('cartItems',JSON.stringify(updatedCart));
            }
            
        },
        
        removeFromCart:(state,action)=>{
            //Task for (20/03/24) -> create an object which has property of price . the price is calculated here only
            //then instead of using action payload use this object.
            //Implement the delete action on the cart Page

            const findIdx = (sz,pizza) =>{
                let res = -1;
                for(let i = 0;i<pizza.size.length;i++){
                  if(pizza.size[i] == sz){
                    res = i
                    break;
                  }
                }
                return res;
            }

            const obj = {
                pizza : action.payload.pizza,
                size  : action.payload.size,
                quantity : action.payload.quantity,
                price : action.payload.pizza.price[findIdx(action.payload.size,action.payload.pizza)] * action.payload.quantity
            }

            const newCart = state.cart.filter((c)=>
            c.pizza._id !== obj.pizza._id)
            state.cart = newCart
            localStorage.setItem('cartItems', JSON.stringify(newCart));
        }
    },
});

export const {addToCart,removeFromCart} = cartSlice.actions

export const selectCart = (state) => state.cart.cart;

export default cartSlice.reducer