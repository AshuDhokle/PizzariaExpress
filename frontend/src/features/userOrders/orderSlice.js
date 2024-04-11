import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    order:[],
}

export const orderSlice = createSlice({
    name:'order',
    initialState,
    reducers:{
        placeOrder : (state,actions) => {
            console.log(actions.payload);
        },
    },
})

export const {placeOrder} = orderSlice.actions

export default orderSlice.reducer