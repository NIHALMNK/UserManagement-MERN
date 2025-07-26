import { createSlice } from "@reduxjs/toolkit";


const initialState={
    user:null,
    token:localStorage.getItem('token')||null,
};

const userSlice =createSlice({
    name:'user',
    initialState,
    reducers:{
        logInSuccess:(state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logOut:(state)=>{
            state.user=null;
            state.token=null;
            localStorage.removeItem('token')
        },
    },
});

export const {logInSuccess ,logOut} = userSlice.actions;
export default userSlice.reducer;