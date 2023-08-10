import { createSlice } from "@reduxjs/toolkit";




const CartDataSlice=createSlice({
    name:'cartData',
    initialState:{
       
   data:[]
  },
    reducers:{
        setCartData:(state,action)=>{
    
    state.data.push(action.payload)

        },
        removeCartData:(state,action)=>{
       
     state.data=state.data.filter((item)=>item.id!==action.payload.id)

        },
        clearCartData:(state,action)=>{
          
        state.data=[]
   
           },
           updateCartData:(state,action)=>{
          console.log(action.payload)
            state.data=action.payload
       
               }
    }

});
export const {setCartData,removeCartData ,clearCartData ,updateCartData} =CartDataSlice.actions;
export default CartDataSlice.reducer 
