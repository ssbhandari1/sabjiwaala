
import React, { useState } from 'react';
import { Avatar, Box, Button, InputLabel, Paper, Stack, TextField, Typography } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from '../firebase/Config';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { removeActiveUser } from '../redux/slice/AuthSlice';


const RegisterPage = () => {
  const navigate=useNavigate()
const dispatch=useDispatch()
  const[userName,setUserName]=useState('')
  const[email,setEmail]=useState('')
  const[password,setPass]=useState('')
  const[phone,setPhone]=useState('')
const[address,setAddress]=useState('')
const[profile,setProfile]=useState(null)

console.log(profile)

  const handleRegister=async()=>{

 try {
  const res=await createUserWithEmailAndPassword(auth,email,password)
  console.log(res)
 const storageRef=ref(storage,'profileImage')
 console.log(storageRef)

 uploadBytes(storageRef,profile)
 .then(()=>{
  getDownloadURL(storageRef).then(url=>{
    addDoc(collection(db,'users'),{
      userName:userName,
      email:email,
      phone:phone,
      password:password,
      address:address,
    profile:url,
      uid:res.user.uid,
     
    })
  })

 })

 toast.success('Your Register  Successfully')
  navigate('/')
 } catch (error) {
  console.log(error.message)
  toast.error(error.message)
 
 }

  }

  const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG']
  const handleSelectImage = (e) => {
      const selectImage = e.target.files[0]
      console.log(selectImage.type)
      if (selectImage && types.includes(selectImage.type)) {
        setProfile(selectImage)
      } else {
          toast.error('please select valid image type(jpg or png )')
      }

  }
  return (
    <Box sx={{width:'100%',height:'100%',background:'rgba(0,0,0,0.05)',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>
<Paper elevation={20}>
    <Box sx={{width:300,height:450,background:'white',color:"black"}}>
    <Stack direction='column' justifyContent='space-evenly' alignItems='center' sx={{width:'100%',height:'100%'}}>

      
    <TextField size='small' label="Image" id="Image" type='file' onChange={handleSelectImage} focused  sx={{display:'none'}}/>
    <InputLabel htmlFor="Image"><Avatar sx={{cursor:'pointer'}}/></InputLabel>
     
<TextField
         label="Phone Number"
       id="outlined-size-small"
    type='text'
       size="small"
       value={phone}
       onChange={(e)=>{setPhone(e.target.value)}}
    
     />
       
     
      <TextField
          label="Name"
          id="outlined-size-small"
       type='text'
          size="small"
          value={userName}
          onChange={(e)=>{setUserName(e.target.value)}}
        />
    <TextField
          label="Email"
          id="outlined-size-small"
       type='email'
          size="small"
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
        />
         <TextField
          label="Password"
          id="outlined-size-small"
      //  type='password'
          size="small"
          value={password}
          onChange={(e)=>{setPass(e.target.value)}}
        />
              <TextField
          label="Address.."
          id="outlined-size-small"
      //  type='password'
          size="small"
          value={address}
          onChange={(e)=>{setAddress(e.target.value)}}
        />

        
      <Button size='small' variant='outlined' onClick={handleRegister} > Sign Up</Button>
     <NavLink to={'/login'}> <Button color='secondary' size='small'>already an account</Button></NavLink> 

    </Stack>
    </Box>
    </Paper>
  </Box>
  )
}

export default RegisterPage