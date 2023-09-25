import React, { useEffect } from 'react';
import { Avatar, Box, Button, Card, Grid, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import IncomeTab from '../components/dashboardComponents/IncomeTab';
import ExpensesTab from '../components/dashboardComponents/ExpensesTab';
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

    // const [open, setOpen] = React.useState(false);
    // const [type, setType] = React.useState();

    // const handleOpenIncome = () => {
    //     setOpen(true)
    //     setType("income")
    // }

    // const handleOpenExpenses = () => {
    //     setOpen(true)
    //     setType("expenses")
    // }

    const logout = () => {
        Cookies.remove('token');
        navigate("/login")
    }



    return (
        <Box sx={{ backgroundColor: '#f0edec52', height: '100vh', overflowY : 'hidden', width: '100vw', margin: 'auto'}}>
            <Toaster />
            <Card sx={{ padding :3}}>
                <Box sx={{ margin: 2, display: 'flex', justifyContent: 'space-between' }}>
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

            <Box sx={{ marginX: 7, overflow: 'auto' }}>
                <Grid container spacing={4}>
                <Grid item xs={6} >
                    <IncomeTab  />
                </Grid>
                <Grid item xs={6} >
                    <ExpensesTab />
                </Grid>
                <Grid item xs={12} sm={12} md={12} >
                    <Graphs />
                </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Dashboard