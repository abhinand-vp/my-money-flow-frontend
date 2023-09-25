import React from 'react';
import { Box, Button, Typography } from '@mui/material'
import ExpenseModal from '../modals/ExpenseModal';

const ExpensesTab = ({expensesAmount}) => {
    const [open, setOpen] = React.useState(false);

    const handleOpenExpenses = () => {
        setOpen(true)
    }

    return (

        <Box sx={{ border: 3, border : 0,  borderRadius: 3, marginY: 3, marginX: 1,  height: '12vh', boxShadow: 2 }}>
            <ExpenseModal openMOdal={open} setOpenModal={setOpen} />
            <Box sx={{ paddingY: 3, paddingX: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5" gutterBottom>Sep - 2023</Typography>
                <Typography variant="h6" gutterBottom>Total Expense : {expensesAmount}</Typography>
                <Button variant='contained' onClick={handleOpenExpenses}>Add Your Expense</Button>
            </Box>

        </Box>
    )
}

export default ExpensesTab