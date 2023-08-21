import React, { useEffect } from 'react';
import { Avatar, Backdrop, Box, Button, Card, Fade, Modal, Stack, TextField, Typography } from '@mui/material'
import DatePicker from '@mui/lab/DatePicker';
import { useForm } from 'react-hook-form';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getDashboard } from '../store/userDetails/UserActions';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast';


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
    },
};

const Dashboard = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const userId = Cookies.get('userId')
        const token = Cookies.get("token")
        const headers = {
            Authorization: `Bearer ${token}`
        };

        console.log({ headers });
        axios.get('http://localhost:3001/dashboard', { headers })
            .then(response => {
                if (!response.data.useridExist) {
                    navigate("/login")
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        if (!userId) {
            navigate("/login")
        }
    }, [])

    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState("");

    const handleOpenIncome = () => {
        setOpen(true)
        setType("income")
    }

    const handleOpenExpenses = () => {
        setOpen(true)
        setType("expenses")
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login")

    }

    const handleClose = () => setOpen(false);

    const modalTitle = type === 'income' ? 'Add Your Income 💯' : 'Add Your Expenses 💯';
    const buttonSubmit = type === 'income' ? 'Add Income' : 'Add Expenses';
    return (
        <Box sx={{ padding: 3 }}>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                        {type === 'income' && (
                            <>
                                <Typography sx={{ marginBottom: 3 }} variant="h5" component="h2">
                                    {modalTitle}
                                </Typography>
                                <form onSubmit={handleSubmit((data) => console.log("dfghjk", data))}>
                                    <TextField
                                        {...register('amount', { required: true })}
                                        label="Amount"
                                        fullWidth
                                        variant="outlined"
                                        type='number'
                                        sx={{ marginBottom: 3 }}
                                        error={!!errors.amount}
                                        helperText={errors.amount && 'Amount is required.'}
                                    />
                                    <TextField
                                        {...register('desc')}
                                        label="Description"
                                        fullWidth
                                        sx={{ marginBottom: 3 }}
                                        variant="outlined"
                                    />
                                    <Button type='submit' variant='contained'>
                                        {buttonSubmit}
                                    </Button>
                                </form>
                            </>
                        )}

                        {type === 'expenses' && (
                            <>
                                <Typography sx={{ marginBottom: 3 }} variant="h5" component="h2">
                                    {modalTitle}
                                </Typography>
                                <TextField fullWidth label="Amount" sx={{ marginBottom: 2 }} variant="outlined" />
                                <TextField fullWidth label="Description" variant="outlined" />
                                <DatePicker />

                                {/* <DatePicker label="Basic date picker" /> */}
                                <DatePicker />
                                <Button type='submit' sx={{ float: 'right', mt: 2 }} variant='contained'>
                                    {buttonSubmit}
                                </Button>
                            </>
                        )}

                        {/* </form> */}

                    </Box>
                </Fade>
            </Modal>
            <Card sx={{ width: '80vw', margin: 'auto' }}>
                <Box sx={{ p: 2, display: 'flex' }}>
                    <Avatar variant="rounded" src="avatar1.jpg" />
                    <Box sx={{ display: 'flex', marginLeft: 10 }}>
                        <Stack>
                            <Typography fontWeight={700}>{ }</Typography>
                            <Typography variant="body2" color="text.secondary">
                            </Typography>
                        </Stack>
                    </Box>
                </Box>
            </Card>
            <Button onClick={logout}>Logout</Button>
            <Box sx={{ position: 'absolute', bottom: '7vh', right: '3vw' }}>
                <Button sx={{ marginRight: 3 }} variant='contained' onClick={handleOpenIncome} >Add Your INcome</Button>
                <Button variant='contained' onClick={handleOpenExpenses}>Add Your Expense</Button>
            </Box>
        </Box>
    )
}

export default Dashboard