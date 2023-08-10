import { Box, CardMedia, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, tableCellClasses, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';

import { img2 } from '../../common/image';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
    //   backgroundColor: theme.palette.common.black,
    //   color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
    //   backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const ViewProduct=()=>{
  //for responsive 
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('450'));
  


      const allProduct = useSelector((state) => state.allProduct)
console.log(allProduct?.data)

return(
    <Box sx={{ width: '100%', height: '80%',  display: 'flex',alignItems:'',justifyContent:'center' }}>
    
    
    <Grid container  sx={{   width:isSmallScreen ? '100%' :'70%', borderRadius: '10px', overflowY: 'auto',marginTop:'1rem'}}>
    
    <TableContainer component={Paper}>
         <Table aria-label="customized table">
           <TableHead>
             <TableRow>
             <StyledTableCell align="center">SNo</StyledTableCell>
               <StyledTableCell align="center">Product</StyledTableCell>
               <StyledTableCell align="center">Price</StyledTableCell>
               <StyledTableCell align="center">Total Quantity(kg)</StyledTableCell>
                <StyledTableCell align="center">Remove</StyledTableCell>
               
             </TableRow>
           </TableHead>
           <TableBody>
           {allProduct?.data && allProduct?.data.map((item , index)=>{
           
             return(
    <StyledTableRow key={item.id}>
                 <StyledTableCell align="center" sx={{width:'60px'}}>
               {index+1}
                 </StyledTableCell>
                 <StyledTableCell align="center" sx={{width:'120px'}}> 
                 <Typography>{item.productName}</Typography>
                 <CardMedia
                     component="img"
                     sx={{ width: '100px', height: '100px', objectFit: 'cover',border:'1px solid black' ,}}
                     image={img2}
                     alt="product"
                   />
                  
                   </StyledTableCell>
                 <StyledTableCell align="center">Rs.{`${+item.price * item.quantity}`}</StyledTableCell>
                 <StyledTableCell align="center" sx={{height:'170px',display:'flex',alignItems:'center',justifyContent:"center"}}>  {item.totalQuantity} <AddIcon sx={{cursor:'pointer'}}onClick={()=>handleQuantity('inc',item.id,item.quantity)}/> </StyledTableCell>
                   <StyledTableCell align="center"><RestoreFromTrashIcon sx={{color:'red'}} onClick={()=>handleDelete(item.id)}/></StyledTableCell>
               </StyledTableRow>
             )
           })}
              
        
           </TableBody>
         </Table>
       </TableContainer>
     
    </Grid>
    
    </Box>
)

}

export default ViewProduct