import { Box, Typography } from '@mui/material'
import React from 'react'

const CountAmount = () => {
    return (

        <Box sx={{ width: '90%', border: 3, borderColor: '#319795', borderRadius: 3, marginTop: 4, height: '25vh' }}>

            <Box sx={{padding : 3}}>
                <Typography  variant="h5" gutterBottom>Sep - 2023</Typography>
                <Typography variant="h6" gutterBottom>Total Income : 50000</Typography>
                <Typography variant="h6" gutterBottom>Total Income : 50000</Typography>

            </Box>

        </Box>
    )
}

export default CountAmount