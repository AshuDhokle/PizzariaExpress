import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import cartReducer from '../features/cart/cartSlice'
import adminReducer from '../features/admin/adminSlice'
import pizzaReducer from '../features/pizzas/pizzaSlice'
const store = configureStore({
    reducer:{
        user:userReducer,
        cart:cartReducer,
        admin:adminReducer,
        pizzas:pizzaReducer,      
    },
})

export default store