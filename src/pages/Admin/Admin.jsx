import { Box, Button, Paper } from '@mui/material';
import React, { useState } from 'react';
import AddProduct from './AddProduct';
import MyAccount from './MyAccount';
import ViewProduct from './ViewProduct';
import ViewOrders from './ViewOrders';



const Admin = () => {
  
  const [showComponent,setShowComponent]=useState('myaccount')
       


    const handleNavigate=(type)=>{
        setShowComponent(type)


    }
    return (
        <Box sx={{ width: '100%', height: '100%', background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: '', flexDirection: 'column' }}>
 <Paper elevation={20} sx={{ marginTop: "2rem" ,display:'flex'}}>
<Button onClick={()=>{handleNavigate('myaccount')}}  variant={showComponent === 'myaccount' ? 'contained'
:"outlined"} >My Account</Button>
<Button onClick={()=>{handleNavigate('addproduct')}} variant={showComponent === 'addproduct' ? 'contained'
:"outlined"} >Add Product</Button>
<Button onClick={()=>{handleNavigate('viewproduct')}} variant={showComponent === 'viewproduct' ? 'contained'
:"outlined"}>View Product</Button>
<Button onClick={()=>{handleNavigate('vieworders')}} variant={showComponent === 'vieworders' ? 'contained'
:"outlined"}>View Orders</Button>


</Paper>
{showComponent === 'addproduct' && <AddProduct/> }
{showComponent === 'myaccount' && <MyAccount/>}
{showComponent === 'viewproduct' && <ViewProduct/>}
{showComponent === 'vieworders' && <ViewOrders/>}

        </Box>
    )
}
export default Admin