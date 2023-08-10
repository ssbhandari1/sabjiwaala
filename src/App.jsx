import { useEffect, useState } from 'react'
import './App.css'
import { Box } from '@mui/material'
import Header from './components/header/Header'
import Footer from './components/footers/Footer'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomeComponent/HomePage'
import Contact from './pages/contact/Contact'
import LoginPage from './auth/LoginPage'
import RegisterPage from './auth/RegisterPage'
import ResetPage from './auth/ResetPage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './pages/profile/Profile'
import Cart from './pages/CartComponent/Cart'
import { QuerySnapshot, collection, getDocs } from 'firebase/firestore'
import { auth, db } from './firebase/Config'
import { onAuthStateChanged } from 'firebase/auth'
import { setAvtiveUser } from './redux/slice/AuthSlice'
import { removeUserData, setUserData } from './redux/slice/userDataSlice'
import { useDispatch, useSelector } from 'react-redux'
import Admin from './pages/Admin/Admin'
import { removeProductData, setProductData } from './redux/slice/ProductDataSlice'
import OrderPlaces from './pages/OrderPlace/OrderPlaces'
import { setReciepientData } from './redux/slice/ReciepientDataSlice'



const App = () => {

  const data = useSelector((state) => state.auth.data)
  const dispatch = useDispatch()

  const userCollectionRef = collection(db, 'users')
  useEffect(() => {
    // Set up the listener once when the component mounts
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser)
      dispatch(setAvtiveUser(currentUser))

      const getUsersData = async () => {
        try {
          const data = await getDocs(userCollectionRef);
          const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))

          dispatch(setUserData(filteredData))
        } catch (error) {
          console.log(error.message)
          toast.error(error.message)
        }
      }

      getUsersData()

    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
      // dispatch(removeActiveUser())

    };
  }, []);


  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      const getAllProduct = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'products'));
          const productArr = [];
          querySnapshot.forEach((doc) => {
            productArr.push({ ...doc.data(), id: doc.id });
          });
          dispatch(setProductData(productArr));
        } catch (error) {
          toast.error(error.message);
        }
      };

      getAllProduct();
    })
    return () => {
      unsubscribe();
      dispatch(removeProductData())

    };

  }, []);



  return (


    <Box sx={{ width: '100%', height: '100vh', background: "rgba(0,0,0,0.08)" }}>
      <ToastContainer />
      <Header />
      <Box sx={{ width: '100%', height: '91vh' }}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/reset' element={<ResetPage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/orderplace' element={<OrderPlaces />} />



        </Routes>
      </Box>

      {/* <Footer/> */}
    </Box>
  )
}

export default App