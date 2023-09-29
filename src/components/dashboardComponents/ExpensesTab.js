import React from 'react';
import { Box, Button, Typography } from '@mui/material'
import ExpenseModal from '../modals/ExpenseModal';
import { monthNames } from '../../constants';
import { useEffect } from 'react';
import { getDashboard } from '../../store/dashboardApis/DashboardAction';
import { useDispatch, useSelector } from 'react-redux';

const ExpensesTab = () => {
    const dispatch = useDispatch();
    const dashboardDats = useSelector((store) => store.dashboard);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        dispatch(getDashboard())
    }, [])




    const handleOpenExpenses = () => {
        setOpen(true)
    }

    return (

        <Box sx={{ border: 3, border: 0, borderRadius: 3, marginY: 3, marginX: 1, height: '25vh', boxShadow: 2 }}>
            <ExpenseModal openMOdal={open} setOpenModal={setOpen} />
            <Box sx={{ paddingY: 3, paddingX: 2 }}>
                <Typography variant="h5" gutterBottom>This MOnth</Typography>
                <Typography variant="h6" gutterBottom>This Month Expense :  </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginX: 1 }}>
                    <Box>
                        <Typography variant="h6" gutterBottom>Food</Typography>
                        <Typography className='ExpenseBoxes'>500</Typography>
                    </Box>
                    <Box>
                        <Typography variant="h6" gutterBottom>Rent</Typography>
                        <Typography className='ExpenseBoxes'>500</Typography>
                    </Box>
                    <Box>
                        <Typography variant="h6" gutterBottom>Personal</Typography>
                        <Typography className='ExpenseBoxes'>500</Typography>
                    </Box>
                    <Box>
                        <Typography variant="h6" gutterBottom>Grocery</Typography>
                        <Typography className='ExpenseBoxes'>500</Typography>
                    </Box>
                    <Box>
                        <Typography variant="h6" gutterBottom>Travel</Typography>
                        <Typography className='ExpenseBoxes'>500</Typography>
                    </Box>
                </Box>
            </Box>

        </Box>
    )
}

export default ExpensesTab