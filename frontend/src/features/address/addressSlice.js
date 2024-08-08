import {createSlice,nanoid} from '@reduxjs/toolkit'
const initialState = {
    address:[],
}

export const addressSlice = createSlice({
    name:'Address',
    initialState,
    reducers:{
        addAddresses:(state,action)=>{
            const newAddressList = action.payload
            let newList = state.address;
            for(let i = 0;i<newAddressList.length;i++){
                newList.push(newAddressList[i]);
            }
            state.address = newList;       
        },
        addAddress:(state,action)=>{
            const newAddress = action.payload;
            let newList = state.address;
            newList.push(newAddress)
            state.address = newList;
        },
        removeAddress:(state,action)=>{
            state.address = []  
        }
    }
});

export const {addAddress,addAddresses} = addressSlice.actions

export const selectAddress = (state) => state.address.address;

export default addressSlice.reducer