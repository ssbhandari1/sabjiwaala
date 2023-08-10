import { Box, Button, FormControl, Paper, TextField, Typography } from '@mui/material';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { db, storage } from '../../firebase/Config';
import { addDoc, collection } from 'firebase/firestore';


const AddProduct = () => {
    const [productName, setProductName] = useState('')
    const [producType, setProductType] = useState('')
    const [productImage, setProductImage] = useState(null)
    const [price, setPrice] = useState('')
    const[totalQuantity,setTotalQuantity]=useState(0)
    const tyoes = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG']
    const handleSelectImage = (e) => {
        const selectImage = e.target.files[0]
        console.log(selectImage.type)
        if (selectImage && tyoes.includes(selectImage.type)) {
            setProductImage(selectImage)
        } else {
            toast.error('please select valid image type(jpg or png )')
        }

    }


    const handleAddProducts = async() => {
        try {
            
      
        const storageRef = ref(storage, `product-image${producType.toUpperCase()}/${Date.now()}`)
        console.log(storageRef)

        uploadBytes(storageRef, productImage)
            .then(() => {
                getDownloadURL(storageRef).then(url=>{
                   addDoc(collection(db,'products'),{
                    productName,
                    producType,
                    price,
                    totalQuantity,
                    quantity:1,
                    productImage:url
                   })
                })
            })
            toast.success('Product Add Successfully ')
            setPrice('')
            setProductImage(null)
            setProductName('')
            setProductType('')
            setTotalQuantity(0)
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    return (
        <Box sx={{ width: '100%', height: '100%',  display: 'flex',alignItems:'center',justifyContent:'center' }}>
        
            <Paper elevation={20} sx={{ p: 1, minHeight: 450, minWidth: 350, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>

                <TextField size='small' label="Product Name" id="productname" value={productName} onChange={(e) => { setProductName(e.target.value) }} />
                <TextField size='small' label="Product Type" id="producttype" value={producType} onChange={(e) => { setProductType(e.target.value) }} />

                <TextField size='small' label="Price" id="Price" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                <TextField size='small' label="Image" id="Image" type='file' onChange={handleSelectImage} focused />
                <TextField size='small' type='number' label="Quantity" id="fullWidth" value={ totalQuantity} onChange={(e)=>{setTotalQuantity(e.target.value)}} />
                <TextField size='small' label="fullWidth" id="fullWidth" />
                <Button onClick={handleAddProducts}>  Add</Button>

            </Paper>
        </Box>
    )
}
export default AddProduct