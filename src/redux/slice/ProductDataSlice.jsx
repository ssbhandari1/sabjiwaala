import { createSlice } from "@reduxjs/toolkit";




const ProductDataSlice=createSlice({
    name:'allProduct',
    initialState:{
       
   data:[]
  },
    reducers:{
        setProductData:(state,action)=>{
    
    state.data=action.payload

        },
        removeProductData:(state,action)=>{
         
            state.data=[]

        }
    }

});
export const {setProductData,removeProductData} =ProductDataSlice.actions;
export default ProductDataSlice.reducer 
