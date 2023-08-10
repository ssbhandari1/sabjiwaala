import { Box, Button, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import AddressPlace from './AddressPlace';
import OrderSummary from './OrderSummary';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import OrderPayment from './OrderPayment';




const OrderPlaces=()=>{

  const [showComponent,setShowComponent]=useState('address')
   


  const handleNavigate=(type)=>{
      setShowComponent(type)



  }
    return(
        <Box sx={{ width: '100%', height: '100%', background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: '', flexDirection: 'column' }}>
      <Paper elevation={20} sx={{ marginTop: "2rem" ,display:'flex',width:400,justifyContent:'space-evenly'}}>
  
      <Button onClick={()=>{handleNavigate('address')}}  variant={showComponent === 'address' ? 'contained'
:"outlined"} >Address</Button>
<Button onClick={()=>{handleNavigate('ordersummary')}} variant={showComponent === 'ordersummary' ? 'contained'
:"outlined"} >order summary</Button>
<Button onClick={()=>{handleNavigate('payment')}} variant={showComponent === 'payment' ? 'contained'
:"outlined"}>Payment</Button>

  

      </Paper>
      {showComponent === 'address' &&    <AddressPlace/> }
      {showComponent === 'ordersummary' &&      <OrderSummary/>}
      {showComponent === 'payment' &&      <OrderPayment/>}
   
   
        </Box>

    )
}
export default OrderPlaces