import React, { useEffect } from 'react';
import { Avatar, Box, Button, Card, Stack,  Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import IncomeModal from '../components/modals/IncomeModal';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40vw',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    '@media (max-width: 600px)': {
        width: '80vw'
    }
};

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
    const [type, setType] = React.useState("");
 
    const handleOpenIncome = () => {
        setOpen(true)
        setType("income")
    }

    const handleOpenExpenses = () => {
        // setOpen(!open)
        setType("expenses")
    }

    const logout = () => {
        Cookies.remove('token');
        navigate("/login")

    }

   
    return (
        <Box sx={{ padding: 3 }}>
            <Toaster />
            <IncomeModal openMOdal={open} />
            <Card sx={{ width: '90vw', margin: 'auto' }}>
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Avatar variant="rounded" src="avatar1.jpg" />
                    <Box sx={{ display: 'flex' }}>
                        <Stack>
                            <Typography fontWeight={700}>{ }</Typography>
                            <Typography variant="body2" color="text.secondary">
                                <Button onClick={logout}>Logout</Button>
                            </Typography>
                        </Stack>
                    </Box>
                </Box>
            </Card>
            <Box sx={{ float: 'right' }}>
            </Box>
            <Box sx={{ position: 'absolute', bottom: '7vh', right: '3vw' }}>
                <Button sx={{ marginRight: 3 }} variant='contained' onClick={handleOpenIncome} >Add Your INcome</Button>
                <Button variant='contained' onClick={handleOpenExpenses}>Add Your Expense</Button>
            </Box>
        </Box>
    )
}

export default Dashboard