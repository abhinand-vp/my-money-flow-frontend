import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Card, Grid, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import IncomeModal from '../components/modals/IncomeModal';
import ExpenseModal from '../components/modals/ExpenseModal';
import CountAmount from '../components/dashboardComponents/CountAmount';
import Reminder from '../components/dashboardComponents/Reminder';
import { Pichart } from '../components/dashboardComponents/Pichart';
import Graphs from '../components/dashboardComponents/Graphs';


const Dashboard = () => {
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:3001/dashboard', { withCredentials: true })
            .then(response => {
                console.log(response.data.validToken);
                if (response.data.validToken === false) {
                    navigate("*");
                }
            })
            .catch(error => {
                console.log("Error response", error.response);
            });

    }, [])

    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState();

    const handleOpenIncome = () => {
        setOpen(true)
        setType("income")
    }

    const handleOpenExpenses = () => {
        setOpen(true)
        setType("expenses")
    }

    const logout = () => {
        Cookies.remove('token');
        navigate("/login")
    }



    return (
        <Box sx={{ padding: 3 }}>
            <Toaster />
            {type == "income" ? (
                <>
                    <IncomeModal openMOdal={open} setOpenModal={setOpen} />
                </>
            ) : (
                <>
                    <ExpenseModal openMOdal={open} setOpenModal={setOpen} />
                </>
            )}

            <Card sx={{ width: '90vw', margin: 'auto' }}>
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Avatar variant="rounded" src="avatar1.jpg" />
                    <Box sx={{ display: 'flex' }}>
                        <Stack>
                            <Typography fontWeight={700}>{ }</Typography>
                            <Typography variant="body2" color="text.secondary">
                                <Button variant='contained' onClick={logout}>Logout</Button>
                            </Typography>
                        </Stack>
                    </Box>
                </Box>
            </Card>

            <Box sx={{ marginX: 7 , height : '70vh', overflow : 'auto'}}>

                <Grid sx={{}} container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} >
                        <CountAmount />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Reminder />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Pichart />
                    </Grid>
                    <Grid item xs={12} sm={6} md={8}>
                        <Graphs />
                    </Grid>
                    <Grid item xs={6}>
                        {/* <CountAmount /> */}
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ position: 'absolute', bottom: '7vh', right: '3vw' }}>
                <Button sx={{ marginRight: 3 }} variant='contained' onClick={handleOpenIncome} >Add Your Income</Button>
                <Button variant='contained' onClick={handleOpenExpenses}>Add Your Expense</Button>
            </Box>
        </Box>
    )
}

export default Dashboard