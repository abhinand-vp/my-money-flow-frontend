import { Box, Button, Grid } from '@mui/material'
import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../image/paper-surrounded-finance-element.jpg';
import Cookies from 'js-cookie';

const StartPage = () => {
    const navigate = useNavigate();
    // const isAuthenticated = localStorage.getItem('token');

    // useEffect(()=>{
    //     if(isAuthenticated){
    //         navigate("/dashboard")
    //     }
    // },[])

    
    useEffect(()=>{
        const localCookies = Cookies.get('token')
          if(localCookies){
              navigate("/dashboard")
          }
      },[])


    const navigateToDashboard = () => {
        navigate('/login');
    };
    
    return (

        <Box
            sx={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100vw',
                height: '100vh', // Set the desired height for your background
            }}
        >
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: '100vh' }}
            >
                <Button variant='contained' onClick={navigateToDashboard} sx={{ fontSize: 20 }}>Let's Start</Button>
            </Grid>
        </Box>

    )
}

export default StartPage