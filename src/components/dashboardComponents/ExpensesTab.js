import React from 'react';
import { Box, Button, Typography } from '@mui/material'
import ExpenseModal from '../modals/ExpenseModal';

const ExpensesTab = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpenExpenses = () => {
        setOpen(true)
    }

    return (

        <Box sx={{ border: 3, borderColor: '#319795', borderRadius: 3, marginTop: 4, height: '12vh' }}>
            <ExpenseModal openMOdal={open} setOpenModal={setOpen} />
            <Box sx={{ paddingY: 3, paddingX: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5" gutterBottom>Sep - 2023</Typography>
                <Typography variant="h6" gutterBottom>Total Expense : 50000</Typography>
                <Button variant='contained' onClick={handleOpenExpenses}>Add Your Expense</Button>
            </Box>

        </Box>
    )
}

export default ExpensesTab