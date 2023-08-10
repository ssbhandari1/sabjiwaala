import { AppBar, Avatar, Badge, Box, Button, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase/Config';
import { useDispatch, useSelector } from 'react-redux';
import { removeActiveUser, setAvtiveUser } from '../../redux/slice/AuthSlice';
import { toast } from 'react-toastify';
import { removeUserData, setUserData } from '../../redux/slice/userDataSlice';
import { Logout, PersonAdd, Settings } from '@mui/icons-material';

import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';


const Header = () => {

  const userData=useSelector((state)=>state.users)
  console.log(userData)
  const navigate=useNavigate()
  const data=useSelector((state)=>state.auth.data)
  const cartData=useSelector((state)=>state.cartData.data)
  const dispatch=useDispatch()
  const[toggle,setToggle]=useState(false)
  const[openMenu,setOpenMenu]=useState(false)


console.log(cartData)

  const toggleDrawer =()=>{
    setToggle(!toggle)
  }


 const UserLogOut=async()=>{
  try {
    const res= await signOut(auth)
    console.log(res)
    toast.success('Successfully Log Out')
    navigate('/')
 
  } catch (error) {
    toast.error(error.message)
  }

 }

 const handleMenuOpen=()=>{
  setOpenMenu(true)
 }

 const handleClose=()=>{
setOpenMenu(false)
 }
 
   




  return (
    <Box sx={{ flexGrow: 1 ,height:'9vh',width:'100%'}}>
    <AppBar position="fixed" style={{ zIndex: 1100 }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleDrawer}
        >
          <MenuIcon />
          <SwipeableDrawer
          anchor="left"
            open={toggle}
            onClose={()=>{setToggle(false)}}
            onOpen={()=>{setToggle(true)}}
            PaperProps={{
              style: {
                marginTop:'3.5rem'
               // height: '400px', // Set your desired height here
              },
            }}
            style={{ zIndex: 1000 }}
          >
          <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={()=>setToggle(false)}
      onKeyDown={()=>setToggle(false)}
    >
      <List>
      <NavLink to={'/'}  >
          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
                 <HomeIcon/>
             
              </ListItemIcon>
              <ListItemText primary='Home' />
            </ListItemButton>
          </ListItem>
          </NavLink>  
          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
               <BusinessCenterIcon/>
              </ListItemIcon>
              <ListItemText primary='My Order' />
            </ListItemButton>
          </ListItem>
      </List>
      <Divider />
   
    </Box>
          </SwipeableDrawer>
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1,fontWeight:'600' }}>
        सब्जीWAALA
        </Typography>
     


{data?.email ? <>
  <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="menu"
      
      sx={{mr:2}} >
           
           <Badge badgeContent={cartData.length} color="secondary">
          <ShoppingCartIcon  onClick={()=>{navigate('/cart')}}/>
          </Badge>
        </IconButton>
     
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="menu"
          aria-controls={openMenu ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? 'true' : undefined}
      onClick={handleMenuOpen}
      
        >
          {
             userData?.data.map((user,index)=>{
              if(data.uid===user.uid){
                return(
                
                  <Avatar key={index} alt="profile" src={user.profile}/>
                
                )
              }

             })
          }

        </IconButton>
        <Menu
        // anchorEl={anchorEl}
        id="account-menu"
        open={openMenu}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 4,
          
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
         
          },
        }}
        transformOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar onClick={()=>{navigate('/profile')}} /> Profile
        </MenuItem>
        {data?.uid==='2RzzyywSGrYZr9c6whanmDJMESL2' ?
          <MenuItem onClick={handleClose}>
          <Avatar onClick={()=>{navigate('admin')}}  /> My account
        </MenuItem>
        :
        <MenuItem onClick={handleClose}>
        <Avatar  /> My account
      </MenuItem>
        }
      
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout onClick={UserLogOut} fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    
 </>
 :
 <>
    <NavLink to={'/login'} >
        <Button variant='contained' color='primary' size='small' sx={{mr:2 ,color:"white"}}>login</Button>
        </NavLink>
        <NavLink to={'/register'} >
 <Button variant='contained' color='secondary' size='small' sx={{mr:2}}>sign up</Button>
 </NavLink>
 </>
}
      
    
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Header