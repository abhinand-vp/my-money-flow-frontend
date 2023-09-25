import React from 'react';
import { Box, Button, Typography } from '@mui/material'
import IncomeModal from '../modals/IncomeModal';

const IncomeTab = () => {

    const [open, setOpen] = React.useState(false);

    const handleOpenIncome = () => {
        setOpen(true)
    }

    return (

        <Box sx={{ border: 3, borderColor: '#319795', borderRadius: 3, marginTop: 4, height: '12vh' }}>
            <IncomeModal openMOdal={open} setOpenModal={setOpen} />
            <Box sx={{ paddingY: 3, paddingX: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5" gutterBottom>Sep - 2023</Typography>
                <Typography variant="h6" gutterBottom>Total Income : 50000</Typography>
                <Button variant='contained' onClick={handleOpenIncome}>Add Your Income</Button>
            </Box>

        </Box>
    )
}

export default IncomeTab