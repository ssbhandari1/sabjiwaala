
import React, { useEffect, useState } from 'react'
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';
import { NavLink, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/Config';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
 
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')





  const handleLogIn=async()=>{
    try {
      const res=await signInWithEmailAndPassword(auth,email,password)
      console.log(res)
      toast.success('Log in successfully')
      navigate(`/`)
      
    } catch (error) {
      
      console.log(error.message)
      toast.error(error.message)
     
    }
  }
  const handleSignGoogle=async()=>{
    try {
      const res=await signInWithPopup(auth,googleProvider)
      console.log(res)
      navigate(`/`)
      
    } catch (error) {
      
      console.log(error.message)
    
    }
  }
  return (
    <Box sx={{width:'100%',height:'100%',background:'rgba(0,0,0,0.05)',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>
<Paper elevation={20}>
    <Box sx={{width:300,height:400,background:'white',color:"black"}}>
    <Stack direction='column' justifyContent='space-around' alignItems='center' sx={{width:'100%',height:'100%'}}>
      <Typography variant='h6' sx={{fontWeight:'600',color:'red'}}>Sign In</Typography>
    
    <TextField
          label="Email"
          id="outlined-size-small"
          value={email}
       onChange={(e)=>{setEmail(e.target.value)}}
          size="small"
        />
         <TextField
          label="Password"
          id="outlined-size-small"
       value={password}
       onChange={(e)=>{setPassword(e.target.value)}}
          size="small"
        />
        <Stack direction='column' sx={{width:'80%'}}>
      <Button size='small' variant='contained' onClick={handleLogIn} > Log In</Button>
      <NavLink to={'/reset'}><Typography sx={{fontSize:'.81rem',margin:'3px'}}>Forgot Password</Typography></NavLink>
<Typography sx={{textAlign:'center'}} >--or--</Typography>
<Button variant='contained' color='secondary' onClick={handleSignGoogle}> Login with google</Button>
<NavLink to={'/register'}><Button color='secondary' size='small'  sx={{marginLeft:'3rem'}}>create  account </Button></NavLink>
</Stack>
    </Stack>
    </Box>
    </Paper>
  </Box>
  )
}

export default LoginPage