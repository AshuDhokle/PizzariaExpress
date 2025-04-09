import { createSlice } from '@reduxjs/toolkit'
const initialUser = localStorage.getItem('User') ? JSON.parse(localStorage.getItem('User')) : null
const initialState = {
    user: initialUser
}

export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        login: (state, action) => {
            const newUser = action.payload
            state.user = newUser.data

            localStorage.setItem('User', JSON.stringify(newUser.data));
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('User');
        },
    },
});

export const { login, logout } = userSlice.actions

export const selectUser = (state) => state.user.user;

export default userSlice.reducer