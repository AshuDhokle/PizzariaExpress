import {createSlice,nanoid} from '@reduxjs/toolkit'
const initialUser = localStorage.getItem('User') ? JSON.parse(localStorage.getItem('User')):null
const initialState = {
    user:initialUser
}

export const userSlice = createSlice({
    name:'User',
    initialState,
    reducers:{
        login:(state,action)=>{
            
            const newUser = action.payload
            state.user = newUser
            // console.log(newUser);
            // console.log(state.user);
            localStorage.setItem('User',JSON.stringify(newUser));
        },
        logout:(state)=>{
            state.user = null;
            localStorage.removeItem('User');
        },
    },
});

export const {login,logout} = userSlice.actions

export const selectUser = (state) => state.user.user;

export default userSlice.reducer