import React, { useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material'
import IncomeModal from '../modals/IncomeModal';
import { monthNames } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboard } from '../../store/dashboardApis/DashboardAction';

const IncomeTab = () => {
    const dispatch = useDispatch();
    const dashboardDats = useSelector((store)=>store.dashboard);
    const [open, setOpen] = React.useState(false);
    
    useEffect(()=>{
        dispatch(getDashboard())
    },[])
    
    
    let prevMOnthIncome = dashboardDats.dashboard.previousmonthtotalIncome;
    let prevMOnth = dashboardDats.dashboard.previousMonth;

    
    // console.log("edstreeeememememem", prevMOnth);
    // const [month, year] = prevMOnth.split('/');
    // const date = new Date(year, month - 1); 
    // const monthName = monthNames[date.getMonth()];
     

    const handleOpenIncome = () => {
        setOpen(true)
    }

    return (

        <Box sx={{ border: 3, border: 0, borderRadius: 3, marginY: 3, marginX: 1, height: '12vh', boxShadow: 2 }}>
            <IncomeModal openMOdal={open} setOpenModal={setOpen} />
            <Box sx={{ paddingY: 3, paddingX: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h5" gutterBottom>{prevMOnth}</Typography>
                <Typography variant="h6" gutterBottom>Total Income : {prevMOnthIncome} </Typography>
                <Button variant='contained' onClick={handleOpenIncome}>Add Your Income</Button>
            </Box>

        </Box>
    )
}

export default IncomeTab