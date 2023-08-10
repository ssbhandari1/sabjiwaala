import { Padding } from '@mui/icons-material';
import { Box, Button, Paper, Stack, TextField } from '@mui/material';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { db, storage } from '../../firebase/Config';
import { addDoc, collection } from 'firebase/firestore';
import { useSelector } from 'react-redux';


const AddressPlace = () => {

    const currentUser=useSelector((state)=>state.auth.data)


console.log(new Date())

console.log(currentUser?.uid)
    const [recipientName, setRecipientName] = useState('')
    const [recipientNumber, setRecipientNumber] = useState('')
    const [recipientAltrNum, setRecipientAltNUm] = useState('')
    const [recipientPin, setRecipientPin] = useState('')
    const [recipientState, setRecipientState] = useState('')
    const [recipientCity, setRecipientCity] = useState('')
    const [recipientHouse, setRecipientHouse] = useState('')
    const [recipientClony, setRecipientClony] = useState('')
    const[disableBtn,setDisanleBtn]=useState(false)


    const handleSubmitAddress =async() => {
        if (!recipientName || !recipientNumber || !recipientPin || !recipientState || !recipientCity || !recipientHouse || !recipientClony) {
            toast.error('Please fill all the fields');
        }else if (!isNaN(recipientName) ||!isNaN(recipientName)|| !isNaN(recipientName)) {
            toast.error('Name not be a number');
        }  else if (isNaN(Number(recipientNumber))) {
            toast.error('Phone Number must be a number');
        } else {
           
            try {
                const storageRef = ref(storage, `Recipient ${recipientName}`)
                console.log(storageRef)
        
                uploadBytes(storageRef)
                    .then(() => {
                        getDownloadURL(storageRef).then(url=>{
                           addDoc(collection(db,`Recipient`),{
                          recipientName,
                          recipientNumber,
                          recipientAltrNum,
                          recipientState,
                          recipientCity,
                          recipientClony,
                          recipientHouse,
                          recipientPin,
                          date:new Date(),
                           uid: currentUser?.uid,
                           })
                        })
                    })
                    toast.success('Successfully submitted');
                    setRecipientAltNUm('')
                    setRecipientCity('')
                    setRecipientClony('')
                    setRecipientHouse('')
                    setRecipientName('')
                    setRecipientNumber('')
                    setRecipientPin('')
                    setRecipientState('')
                    setDisanleBtn(true)
            }catch (error) {
                toast.error(error.message);
            }
        }

    }

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Paper elevation={20} sx={{ p: 1, minHeight: 450, minWidth: 350, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>

                <TextField required size='small' label="Full Name (Required)" id="fullname" focused value={recipientName} onChange={(e) => { setRecipientName(e.target.value) }} />
                <TextField required size='small' label="Phone number (Required)" id="phonen" type='number' focused value={recipientNumber} onChange={(e) => { setRecipientNumber(Number(e.target.value) || '') }} />
                <TextField size='small' label="Alternative Phone number (optional)" id="Image" type='number' focused value={recipientAltrNum} onChange={(e) => { setRecipientAltNUm(Number(e.target.value) || '') }} />

                <Stack direction='row' alignItems='center' gap='1rem'>
                    <TextField required size='small' label="Pincode" id="pin" type='number' focused value={recipientPin} onChange={(e) => { setRecipientPin(Number(e.target.value) || '') }} />
                    <Button variant='contained'> By location</Button>
                </Stack>
                <Stack direction='row' alignItems='center' gap='1rem'>
                    <TextField required size='small' label="State" id="state" focused value={recipientState} onChange={(e) => { setRecipientState(e.target.value) }} />
                    <TextField required size='small' label="City" id="city" focused value={recipientCity} onChange={(e) => { setRecipientCity(e.target.value) }} />
                </Stack>
                <TextField required size='small' label="House No. Building Name(Required)" id="houseno" value={recipientHouse} onChange={(e) => { setRecipientHouse(e.target.value) }} />
                <TextField required size='small' label="Area,Clony(Required)" id="aea" value={recipientClony} onChange={(e) => { setRecipientClony(e.target.value) }} />

                <Button disabled={disableBtn} sx={{ backgroundColor: 'red' }} onClick={handleSubmitAddress}>  Done</Button>

            </Paper>
        </Box>
    )
}
export default AddressPlace