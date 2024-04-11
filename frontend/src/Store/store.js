import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import cartReducer from '../features/cart/cartSlice'
import adminReducer from '../features/admin/adminSlice'
const store = configureStore({
    reducer:{
        user:userReducer,
        cart:cartReducer,
        admin:adminReducer,
    },
})

export default store