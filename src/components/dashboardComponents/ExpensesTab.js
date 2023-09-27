import React from 'react';
import { Box, Button, Typography } from '@mui/material'
import ExpenseModal from '../modals/ExpenseModal';
import { monthNames } from '../../constants';
import { useEffect } from 'react';
import { getDashboard } from '../../store/dashboardApis/DashboardAction';
import { useDispatch, useSelector } from 'react-redux';

const ExpensesTab = () => {
    const dispatch = useDispatch();
    const dashboardDats = useSelector((store)=>store.dashboard);
    const [open, setOpen] = React.useState(false);

    useEffect(()=>{
        dispatch(getDashboard())
    },[])

    let prevMOnthExpenses = dashboardDats.dashboard.previousmonthtotalExpense;
    let prevMOnth = dashboardDats.dashboard.previousMonth;


    const handleOpenExpenses = () => {
        setOpen(true)
    }

    return (

        <Box sx={{ border: 3, border : 0,  borderRadius: 3, marginY: 3, marginX: 1,  height: '12vh', boxShadow: 2 }}>
            <ExpenseModal openMOdal={open} setOpenModal={setOpen} />
            <Box sx={{ paddingY: 3, paddingX: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5" gutterBottom>{prevMOnth}</Typography> 
                 <Typography variant="h6" gutterBottom>Total Expense : {prevMOnthExpenses}</Typography>
                <Button variant='contained' onClick={handleOpenExpenses}>Add Your Expense</Button>
            </Box>

        </Box>
    )
}

export default ExpensesTab