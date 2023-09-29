import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Card, Grid, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import IncomeTab from '../components/dashboardComponents/IncomeTab';
import ExpensesTab from '../components/dashboardComponents/ExpensesTab';
import Graphs from '../components/dashboardComponents/Graphs';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboard } from '../store/dashboardApis/DashboardAction';
import { UserData } from '../chartData';

const Dashboard = () => {

    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [
          {
            label: "Users Gained",
            data: UserData.map((data) => data.userGain),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });


    const navigate = useNavigate()
    const dispatch = useDispatch();

    const dashboardDats = useSelector((store)=>store.dashboard);

    useEffect(()=>{
        dispatch(getDashboard());
    }, [])
    
    let userDetails = dashboardDats.dashboard?.userExist?.userName;
    
    const logout = () => {
        Cookies.remove('token');
        navigate("/login")
    }

    return (
        <Box sx={{ backgroundColor: '#f0edec52', height: '100vh', overflow: 'auto', width: '100vw', margin: 'auto' }}>
            <Toaster />
            <Card sx={{ padding: 3 }}>
                <Box sx={{ marginX: 6, marginY: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Avatar variant="rounded" src="avatar1.jpg" />
                            <Typography fontWeight={700}>{userDetails}</Typography>
                    <Box sx={{ display: 'flex' }}>
                        <Stack>
                            <Typography variant="body2" color="text.secondary">
                                <Button variant='contained' onClick={logout}>Logout</Button>
                            </Typography>
                        </Stack>
                    </Box>
                </Box>
            </Card>

            <Box sx={{ marginX: 7, overflow: 'hidden' }}>
                <Grid container columnSpacing={4} rowSpacing={1}>
                    <Grid item xs={8} >
                        <IncomeTab />
                    </Grid>
                    <Grid item xs={4} >
                        <ExpensesTab />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6}  sx={{height : '50vh'}} >
                        <Graphs chartData={userData} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Dashboard