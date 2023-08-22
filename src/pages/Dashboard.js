import React, { useEffect } from 'react';
import { Avatar, Backdrop, Box, Button, Card, Fade, Modal, Stack, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import Cookies from 'js-cookie';


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
    const [date, setDate] = useState(null)


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
        Cookies.remove('token');
        navigate("/login")

    }

    const handleClose = () => setOpen(false);

    const onSubmit = data => {
        const inputDate = new Date(date)
        const formattedDate = inputDate.toLocaleString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timeZoneName: 'short'
        });
        let params = {
            income_amount: data.amount,
            income_desc: data.desc,
            income_date: formattedDate
        }

        console.log("params", params);
        axios.post("http://localhost:3001/add-income", { params }, { withCredentials: true })
            .then((response) => {
                toast.success(response.data.msg)
            })
            .catch(error => {
                console.log("Error response", error);
            });

    }


    const modalTitle = type === 'income' ? 'Add Your Income 💯' : 'Add Your Expenses 💯';
    const buttonSubmit = type === 'income' ? 'Add Income' : 'Add Expenses';
    return (
        <Box sx={{ padding: 3 }}>
            <Toaster />
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
                        {type === 'income' && (
                            <>
                                <Typography sx={{ marginBottom: 3 }} variant="h5" component="h2">
                                    {modalTitle}
                                </Typography>
                                <form onSubmit={handleSubmit(onSubmit)}>
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
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            fullWidth
                                            sx={{ marginBottom: 3 }}
                                            label="Select Date"
                                            value={date}
                                            onChange={(newValue) => setDate(newValue)}
                                            renderInput={(props) => <TextField {...props} />}
                                        />
                                    </LocalizationProvider>
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
                                <Button type='submit' sx={{ float: 'right', mt: 2 }} variant='contained'>
                                    {buttonSubmit}
                                </Button>
                            </>
                        )}
                    </Box>
                </Fade>
            </Modal>
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