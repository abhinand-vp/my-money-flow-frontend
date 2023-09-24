import { Box, Button } from '@mui/material'
import React from 'react'

const Reminder = () => {
    return (
        <Box sx={{ width: '90%', border: 3, borderColor: '#319795', borderRadius: 3, marginTop: 4, height: '25vh' }}>

            <Box sx={{ display: 'grid', height: '100%', placeItems: 'center' }}>
                <Button variant='contained'> Add Reminder</Button>

            </Box>

        </Box>
    )
}

export default Reminder