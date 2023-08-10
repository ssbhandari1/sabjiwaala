import { Box, Button, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth, db } from '../../firebase/Config';
import { onAuthStateChanged } from 'firebase/auth';
import { setReciepientData } from '../../redux/slice/ReciepientDataSlice';


const OrderSummary=()=>{
const dispatch=useDispatch()

    const recipientCollectionRef = collection(db, 'Recipient')
    const recipientQuery = query(recipientCollectionRef, orderBy('date', 'asc'))
    useEffect(() => {
      // Set up the listener once when the component mounts
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        console.log(currentUser)
     
  
        const getRecipientData = async () => {
          try {
            const data = await getDocs(recipientQuery);
            const filteredData = data.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
  
            dispatch(setReciepientData(filteredData))
          } catch (error) {
            console.log(error.message)
            toast.error(error.message)
          }
        }
  
        getRecipientData()
  
      });
  
      // Clean up the listener when the component unmounts
      return () => {
        unsubscribe();
        // dispatch(removeActiveUser())
  
      };
    }, []);
    const cartData=useSelector((state)=>state.cartData.data)
    const totalPrice=cartData.length && cartData.map((item)=>(+item.price )* item.quantity).reduce((accum,item)=>accum+=item)
    console.log(totalPrice)
    console.log(cartData)

    const currentUser=useSelector((state)=>state.auth.data)
    const recipientData=useSelector((state)=>state.recipientData.data)
    console.log(recipientData.length)
    //for responsive 
const theme = useTheme();
const isSmallScreen = useMediaQuery(theme.breakpoints.down('450'));
    return(
        <Box sx={{ width: '100%', height: '100%',  display: 'flex',alignItems:'center',justifyContent:'center' }}>
        <Paper elevation={20} sx={{ p: 1, minHeight: 500, minWidth:isSmallScreen ? '90%': '40%', display: 'flex',justifyContent: 'space-around' ,alignItems:'center',flexDirection:'column' }}>

      {recipientData.map((item,index)=>{
        console.log(item)
if(currentUser.uid===item.uid){
return(
    <Stack sx={{width:'90%',height:200,border:"1px solid black",padding:'1rem',display:'flex',flexDirection:'column',justifyContent:'space-around'}}>
    <Typography sx={{fontSize:'1rem',fontWeight:'600'}}>Deliver to :</Typography>
    <Typography sx={{fontSize:'1.3rem',fontWeight:'600'}}>{item.recipientName}</Typography>
    <Typography sx={{fontSize:'.8rem'}}>{`${item.recipientHouse},${item.recipientClony}, ${item.recipientPin},${item.recipientCity} (${item.recipientState})`} </Typography>
    <Typography sx={{fontSize:'.8rem'}}>{item.recipientNumber} , {item.recipientAltrNum}</Typography>
</Stack>
)
}
      })}      

    <Stack sx={{width:'90%',height:200,border:"1px solid black",display:'flex',flexDirection:'column',justifyContent:'space-around',padding:'1rem'}}>
    <Typography sx={{fontSize:'1rem',fontWeight:'600'}}>Price Details</Typography>
        <Typography sx={{fontSize:'1.3rem',fontWeight:'600'}}>Total Item : {cartData.length}</Typography>
        <Typography sx={{fontSize:'1.3rem',fontWeight:'600'}}>Total Price : {totalPrice}</Typography>
      
    </Stack>
    <Button>Next</Button>
     </Paper>
     </Box>
    )
}
export default OrderSummary