
import React, { useState } from 'react'

import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';
import { NavLink, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/Config';
import { toast } from 'react-toastify';
const ResetPage = () => {

  const navigate=useNavigate();
  const[email,setEmail]=useState('')
  const handleResetPassword=async()=>{
try {
  const res=await sendPasswordResetEmail(auth,email)
  console.log(res)
  toast.success('Chek your email for reset link')
navigate('/login')
setEmail('')
  
} catch (error) {
  console.log(error.message)
 toast.error('User not found')
 setEmail('')
}
  }
  return (
    <Box sx={{width:'100%',height:'100%',background:'rgba(0,0,0,0.05)',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>
    <Paper elevation={20}>
        <Box sx={{width:300,height:200,background:'white',color:"black"}}>
        <Stack direction='column' justifyContent='space-around' alignItems='center' sx={{width:'100%',height:'100%'}}>
          <Typography variant='h6' sx={{fontWeight:'600',color:'red'}}>Forgot Password</Typography>
        
        <TextField
              label="Enter Email"
              id="outlined-size-small"
              value={email}
           onChange={(e)=>{setEmail(e.target.value)}}
              size="small"
            />
      
           
    <Button variant='contained' color='secondary' onClick={handleResetPassword}> Reset password</Button>
   
        </Stack>
        </Box>
        </Paper>
      </Box>
  )
}

export default ResetPage