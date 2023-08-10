import { Alert, Box, Button, CardMedia, Grid, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { useDispatch, useSelector } from 'react-redux';
import { clearCartData, removeCartData, updateCartData } from '../../redux/slice/CartDataSlice';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { img2 } from '../../common/image';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const Cart = () => {



  const navigate=useNavigate()
const dispatch=useDispatch()
  const cartData=useSelector((state)=>state.cartData.data)
const totalPrice=cartData.length && cartData.map((item)=>(+item.price )* item.quantity).reduce((accum,item)=>accum+=item)
console.log(totalPrice)
console.log(cartData)



const handleDelete=(id)=>{
const filterCart=cartData.find((item)=>item.id===id)
console.log(filterCart)
dispatch(removeCartData(filterCart))
}


const handleClearCart=()=>{
  dispatch(clearCartData())
}

const handleQuantity=(type,id ,quantity)=>{
  if(quantity > 0 ){
    const updateItem=cartData.map((item,index)=>{
      if(item.id===id ){
       return{ 
         ...item,
         quantity:type==='inc' ? item.quantity+1 : item.quantity-1 ,
         // price: (+item.price) * item.quantity 
       }
      }
      return item
      })
      dispatch(updateCartData(updateItem))
  }else  {
    const filterCart=cartData.find((item)=>item.id===id)
console.log(filterCart)
dispatch(removeCartData(filterCart))
  }
 
}


  return (
    <Box sx={{width:'100%',height:'100%',background:'rgba(0,0,0,0.05)',display:'flex',alignItems:'start',justifyContent:'space-evenly',flexDirection:'column'}}>


{
  cartData.length  ?
<>
 <Typography variant='h5'>Shoppping Cart</Typography>
    <Grid container gap='4rem' sx={{  width: '100%', height: "70%", borderRadius: '10px', overflowY: 'auto',}}>
    
    <TableContainer component={Paper}>
         <Table sx={{ minWidth: 700 }} aria-label="customized table">
           <TableHead>
             <TableRow>
             <StyledTableCell align="center">SNo</StyledTableCell>
               <StyledTableCell align="center">Product</StyledTableCell>
               <StyledTableCell align="center">Price</StyledTableCell>
               <StyledTableCell align="center">Quantity(kg)</StyledTableCell>
                <StyledTableCell align="center">Remove</StyledTableCell>
               
             </TableRow>
           </TableHead>
           <TableBody>
           {cartData && cartData.map((item , index)=>{
           
             return(
    <StyledTableRow key={item.id}>
                 <StyledTableCell align="center" sx={{width:'60px'}}>
               {index+1}
                 </StyledTableCell>
                 <StyledTableCell align="center" sx={{width:'200px'}}> 
                 <Typography>{item.productName}</Typography>
                 <CardMedia
                     component="img"
                     sx={{ width: '170px', height: '170px', objectFit: 'cover',border:'1px solid black' ,}}
                     image={img2}
                     alt="product"
                   />
                  
                   </StyledTableCell>
                 <StyledTableCell align="center">Rs.{`${+item.price * item.quantity}`}</StyledTableCell>
                 <StyledTableCell align="center" sx={{height:'170px',display:'flex',alignItems:'center',justifyContent:"center"}}> <RemoveIcon sx={{cursor:'pointer'}} onClick={()=>handleQuantity('dec',item.id,item.quantity)}/> {item.quantity} <AddIcon sx={{cursor:'pointer'}}onClick={()=>handleQuantity('inc',item.id,item.quantity)}/> </StyledTableCell>
                   <StyledTableCell align="center"><RestoreFromTrashIcon sx={{color:'red'}} onClick={()=>handleDelete(item.id)}/></StyledTableCell>
               </StyledTableRow>
             )
           })}
              
        
           </TableBody>
         </Table>
       </TableContainer>
     
    </Grid>
    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{width:'100%',height:'20%',}}>
      <Button onClick={handleClearCart} variant='contained' color='error'> clear cart</Button>
      <Box sx={{background:'white',width:200,marginRight:'1rem',borderRadius:'5px',padding:'5px'}}>
        <Typography>Total Item : ({cartData.length} item)</Typography>
        <Typography>Subtotal : ₹{ totalPrice}</Typography>
        <Button sx={{backgroundColor:'yellow'}} onClick={()=>{navigate('/orderplace')}}>Proceed to buy</Button>
      </Box>
    </Stack> 
    </>

:


<Box sx={{width:'100%',height:'100%',background:'rgba(0,0,0,0.05)',display:'flex',alignItems:'center',justifyContent:'center',}}>
<Paper elevation={20}>
  <Box sx={{width:350,height:200,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-around'}}>
<RemoveShoppingCartIcon sx={{fontSize:"5rem",color:'red'}}/>
<Typography sx={{fontSize:"1rem",fontWeight:'600',color:'red'}}>Your cart is Empty !</Typography>
  </Box>
</Paper>
</Box>
}
    </Box>
  )
}

export default Cart