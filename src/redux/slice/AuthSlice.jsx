import { createSlice } from "@reduxjs/toolkit";




const authSlice=createSlice({
    name:'auth',
    initialState:{
  islogedIn:false,
   data:null
  },
    reducers:{
        setAvtiveUser:(state,action)=>{
     
            state.islogedIn=true,
            state.data = {
                uid: action.payload.uid, 
                email: action.payload.email,
             
              };

        },
        removeActiveUser:(state,action)=>{
         
            state.islogedIn=false,
            state.data=null

        }
    }

});
export const {setAvtiveUser,removeActiveUser} =authSlice.actions;
export default authSlice.reducer 

