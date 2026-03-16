import { createSlice } from "@reduxjs/toolkit";
const initialState={
    currentUser:null,
    error:null,
    loading:false
 }

 const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart: (state)=>{
            state.loading=true;
        },
        signInSuccess:(state, action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error= null;
        },
        signInFailure:(state, action)=>{
            state.error= action.payload;
             state.loading=false;
        },
         setUser: (state, action) => {
            state.currentUser = action.payload;
        },
        updateAvatar: (state, action) => {
            if (state.currentUser) {
                state.currentUser.avatar = action.payload;
            }
        },
        deleteUserStart:(state, action)=>{
             state.loading = true;
        },
         deleteUserSuccess:(state, action)=>{
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
         deleteUserFailure:(state, action)=>{
            state.error = action.payload;
            state.loading = false;    
        },
        logoutUserStart:(state, action)=>{
             state.loading = true;
        },
         logoutUserSuccess:(state, action)=>{
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
         logoutUserFailure:(state, action)=>{
            state.error = action.payload;
            state.loading = false;    
        }

    }
 });

 export const {signInStart, signInSuccess,signInFailure ,setUser ,updateAvatar, deleteUserStart, deleteUserSuccess,deleteUserFailure,logoutUserStart, logoutUserSuccess,logoutUserFailure}=userSlice.actions;
 export default userSlice.reducer;