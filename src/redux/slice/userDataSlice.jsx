import { createSlice } from "@reduxjs/toolkit";




const userDataSlice=createSlice({
    name:'userData',
    initialState:{
        // isloading:false,
   data:[]
  },
    reducers:{
        setUserData:(state,action)=>{
            console.log(action.payload)
            // state.isloading=true,
            state.data=action.payload

        },
        removeUserData:(state,action)=>{
         
            state.data=[]

        }
    }

});
export const {setUserData,removeUserData} =userDataSlice.actions;
export default userDataSlice.reducer 
