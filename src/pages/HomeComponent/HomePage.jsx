import { Box, Button, CardMedia, Grid, Paper, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { images } from '../../common/image';
import { img2 } from '../../common/image';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase/Config';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../../redux/slice/userDataSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { removeActiveUser, setAvtiveUser } from '../../redux/slice/AuthSlice';
import { toast } from 'react-toastify';
import { setCartData } from '../../redux/slice/CartDataSlice';
import {  useTheme, useMediaQuery } from '@mui/material';






// const customTheme = createTheme({
//   breakpoints: {
//     values: {
//       xs: 0,     // Extra small screens
//       sm: 600,   // Small screens
//       md: 960,   // Medium screens
//       lg: 1280,  // Large screens
//       xl: 1920,  // Extra large screens
//       // Add any additional breakpoints you need
//     },
//   },
// });


const HomePage = () => {


//for responsive 
const theme = useTheme();
const isSmallScreen = useMediaQuery(theme.breakpoints.down('450'));

  const dispatch=useDispatch()
  const data=useSelector((state)=>state.auth.data)
  const allProduct = useSelector((state) => state.allProduct)
  const cartData=useSelector((state)=>state.cartData.data)

// console.log(data.uid)
// console.log(allProduct?.data)


// useEffect(()=>{
//   const storedData=localStorage.getItem('cartData')
//   if(storedData){
//     dispatch(setCartData(JSON.parse(storedData)))
//   }
// })

// useEffect(()=>{
//   localStorage.setItem('cartData',JSON.stringify(cartData))
// },[cartData])



const handleAddToCart=(id)=>{

  if(data?.email){
    const itemInCart=cartData.find((item)=>item.id===id)
    if(!itemInCart){
    const selectedItem=allProduct.data.find((item)=>item.id===id)
    if(selectedItem){
      dispatch(setCartData(selectedItem))
    }
    }else{
      toast.info('Item already in the cart!');
    }
  
  }else{
    toast.error('please login first')
  }
}








  return (
    <Box sx={{ width: '100%', height: 'auto', background: 'rgba(0,0,0,1.05)', position: 'relative' }}>
      <CardMedia
        component="img"

        image={images}
        alt="vag"
        sx={{ width: '100%', height: '80vh', objectFit: 'cover' }}
      />
      <Grid container sx={{ width: '100%', }}>
        {allProduct?.data.map((product, index) => {
          return (
            <Grid item xs={isSmallScreen ? 12 : 3} key={index} sx={{ height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Paper elevation={10} sx={{ width: '250px', height: '280px', display: 'flex', flexDirection: 'column', gap: ".5rem", alignItems: 'center', backgroundColor: 'rgb(255,255,255,)',transition:'all 0.3s ease-in-out','&:hover': { transform: "scale(1.1)" }  }}>

                <CardMedia
                  component="img"

                  image={img2}
                  alt="vagitables"
                  sx={{ width: '100%', height: '200px', borderRadius: '5px' }}
                />
                <Stack direction='row' justifyContent='space-around' sx={{ width: '100%', }}>
                  <Typography sx={{fontSize:'1rem',fontWeight:'600',textTransform:'capitalize'}}>{product.productName}</Typography>
                  <Typography sx={{fontSize:'.8rem' ,color:'white',backgroundColor:'green',borderRadius:'5px',padding:'5px'}} >Price :{product.price}Rs.</Typography>
                </Stack>

                <Button size='small' variant='contained' onClick={()=>{handleAddToCart(product.id)}}>Add to cart</Button>
              </Paper>

            </Grid>
          )
        })}



      </Grid>
    </Box>
  )
}

export default HomePage