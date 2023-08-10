import { Box, CardMedia, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'


const Profile=()=>{

  //for responsive 
const theme = useTheme();
const isSmallScreen = useMediaQuery(theme.breakpoints.down('450'));


    const currentUser=useSelector((state)=>state.auth.data)
    const userData=useSelector((state)=>state.users)
   
    return(
        <Box sx={{width:'100%',height:'100%',background:'rgba(0,0,0,0.05)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>

          <Typography  sx={{fontSize:'2rem',fontWeight:'bold',marginBottom: isSmallScreen?"0":'2rem',}}> Your Account Details</Typography>
          <Box sx={{width:'70%',height:'70%' ,display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:isSmallScreen? 'column':''}}>
          <Paper elevation={20} sx={{minWidth:200,height:200}}>
          {userData?.data.map((user,index)=>{
                if(currentUser.uid===user.uid){
return(
  <CardMedia
        component="img"

        key={index}
        image={user.profile}
        alt="vag"
        sx={{ width: '100%', height: '100%', objectFit: 'fill' }}
      />
)
                }})
              }
        
          </Paper>
<Paper elevation={20} sx={{minWidth:300,height:'auto'}}>
<TableContainer >
      <Table  aria-label="customized table">
        <TableHead>
            {userData?.data.map((user,index)=>{
                if(currentUser.uid===user.uid){
                    return(<>
                        <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">{user.userName} </TableCell>
                       
                      </TableRow>
                       <TableRow>
                       <TableCell align="left">Email ID</TableCell>
                       <TableCell align="left">{user.email} </TableCell>
                      
                     </TableRow>
                      <TableRow>
                      <TableCell align="left">Phone No.</TableCell>
                      <TableCell align="left">{user.phone} </TableCell>
                     
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Address</TableCell>
                      <TableCell align="left">{user.address} </TableCell>
                     
                    </TableRow>
                    
                    </>
                    )
                }
               
            })}
         
        
        </TableHead>
     
      </Table>
    </TableContainer>
    </Paper>
    </Box>
        </Box>
    )
}

export default Profile