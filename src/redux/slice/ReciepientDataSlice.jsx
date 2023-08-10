import { createSlice } from "@reduxjs/toolkit";




const RecipientDataSlice=createSlice({
    name:'recipient',
    initialState:{
       
   data:[]
  },
    reducers:{
        setReciepientData:(state,action)=>{
    // console.log(action.payload)
    state.data=action.payload

        },
        removeRecipientData:(state,action)=>{
         
            state.data=[]

        }
    }

});
export const {setReciepientData,removeRecipientData} =RecipientDataSlice.actions;
export default RecipientDataSlice.reducer 
