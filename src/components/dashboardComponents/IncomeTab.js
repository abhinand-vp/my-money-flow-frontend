import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material'
import IncomeModal from '../modals/IncomeModal';
import { monthNames } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboard } from '../../store/dashboardApis/DashboardAction';
import ExpenseModal from '../modals/ExpenseModal';

const IncomeTab = () => {
    const dispatch = useDispatch();
    const dashboardDats = useSelector((store) => store.dashboard);
    const [open, setOpen] = React.useState(false);
    const [type, setType] = useState("");

    useEffect(() => {
        dispatch(getDashboard())
    }, [])


    let prevMOnthIncome = dashboardDats.dashboard?.previousmonthtotalIncome;
    let prevMOnthExpenses = dashboardDats.dashboard?.previousmonthtotalExpense;
    let prevMOnth = dashboardDats.dashboard?.previousMonth;

    console.log("prevMOnth", prevMOnth);


    // // console.log("edstreeeememememem", prevMOnth);
    // const [month, year] = prevMOnth&& prevMOnth?.split('/');
    // const date = new Date(year, month - 1); 
    // const monthName = monthNames[date.getMonth()];


    const handleOpenIncome = () => {
        setOpen(true);
        setType("income");
    }

    const handleOpenExpenses = () => {
        setOpen(true);
        setType("expenses");
    }

    return (

        <Box sx={{ border: 3, border: 0, borderRadius: 3, marginY: 3, marginX: 1, height: '25vh', boxShadow: 2 }}>
            {type == "income" ? <>
                <IncomeModal openMOdal={open} setOpenModal={setOpen} />
            </> : <>
                <ExpenseModal openMOdal={open} setOpenModal={setOpen} />
            </>}
            <Box sx={{ paddingY: 3, paddingX: 2 }}>
                <Typography sx={{textAlign : 'center'}} variant="h5" gutterBottom>{prevMOnth}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginY: 2, marginX :1 }}>
                    <Typography variant="h6" gutterBottom>Total Income : <Box fontWeight='fontWeightMedium' display='inline' color='red'>{prevMOnthIncome}</Box> </Typography>
                    <Button variant='contained' onClick={handleOpenIncome}>Add Your Income</Button>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginX :1 }}>
                    <Typography variant="h6" gutterBottom>Total Expense : <Box fontWeight='fontWeightMedium' display='inline' color='red'>{prevMOnthExpenses}</Box> </Typography>
                    <Button variant='contained' onClick={handleOpenExpenses}>Add Your Expense</Button>
                </Box>
            </Box>

        </Box>
    )
}

export default IncomeTab