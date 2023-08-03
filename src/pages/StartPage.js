import { Box, Button, Grid } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../image/paper-surrounded-finance-element.jpg';

const StartPage = () => {
    const navigate = useNavigate();

    const navigateToDashboard = () => {
        navigate('/dashboard');
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