import { createSlice } from '@reduxjs/toolkit';

const initialAdmin = localStorage.getItem('Admin') ? JSON.parse(localStorage.getItem('Admin')) : null;

const initialState = {
    admin:initialAdmin
}


export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    loginAdmin: (state, action) => {
      const newAdmin = action.payload;
      state.admin = newAdmin;
      localStorage.setItem('Admin', JSON.stringify(newAdmin));
    },
    logoutAdmin: (state) => {
      state.admin = null;
      localStorage.removeItem('Admin');
    },
  },
});

export const { loginAdmin, logoutAdmin } = adminSlice.actions;

export const selectAdmin = (state) => state.admin.admin;

export default adminSlice.reducer;
