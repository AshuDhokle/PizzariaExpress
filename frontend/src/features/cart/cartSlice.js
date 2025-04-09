import { createSlice } from '@reduxjs/toolkit'

const initialCart = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const initialState = {
    cart: initialCart,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {

            const findIdx = (sz, pizza) => {
                let res = -1;
                for (let i = 0; i < pizza.size.length; i++) {
                    if (pizza.size[i] == sz) {
                        res = i
                        break;
                    }
                }
                return res;
            }

            const obj = {
                pizza: action.payload.pizza,
                size: action.payload.size,
                quantity: action.payload.quantity,
                price: action.payload.pizza.price[findIdx(action.payload.size, action.payload.pizza)] * action.payload.quantity
            }



            const alreadyExists = state.cart.find(item => {
                return item.pizza._id == obj.pizza._id
            })



            if (alreadyExists) {
                const updatedCart = state.cart.map(item => item.pizza._id === obj.pizza._id ? obj : item);
                state.cart = updatedCart;
                localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            }
            else {
                const updatedCart = [...state.cart, obj];
                state.cart = updatedCart;
                localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            }

        },

        removeFromCart: (state, action) => {


            const findIdx = (sz, pizza) => {
                let res = -1;
                for (let i = 0; i < pizza.size.length; i++) {
                    if (pizza.size[i] == sz) {
                        res = i
                        break;
                    }
                }
                return res;
            }

            const obj = {
                pizza: action.payload.pizza,
                size: action.payload.size,
                quantity: action.payload.quantity,
                price: action.payload.pizza.price[findIdx(action.payload.size, action.payload.pizza)] * action.payload.quantity
            }

            const newCart = state.cart.filter((c) =>
                c.pizza._id !== obj.pizza._id)
            state.cart = newCart
            localStorage.setItem('cartItems', JSON.stringify(newCart));
        }
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions

export const selectCart = (state) => state.cart.cart;

export default cartSlice.reducer